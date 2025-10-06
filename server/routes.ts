import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { Resend } from "resend";

const POSTS_DIR = path.join(process.cwd(), "blog");

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }

  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  if (!connectionSettings || !connectionSettings.settings.api_key) {
    throw new Error("Resend not connected");
  }
  return {
    apiKey: connectionSettings.settings.api_key,
    fromEmail: connectionSettings.settings.from_email,
  };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail,
  };
}

function getAllPostMetadata() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIR);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(POSTS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const plainText = content.replace(/[#*`\[\]()]/g, "").trim();
      const excerpt = plainText.substring(0, 150);

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        thumbnail: data.thumbnail || null,
        excerpt: excerpt || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog API routes
  app.get("/api/blog", (req, res) => {
    try {
      const posts = getAllPostMetadata();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", (req, res) => {
    try {
      const { slug } = req.params;
      const fullPath = path.join(POSTS_DIR, `${slug}.md`);

      if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: "Post not found" });
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const htmlContent = marked.parse(content) as string;
      const sanitizedContent = DOMPurify.sanitize(htmlContent);

      res.json({
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        thumbnail: data.thumbnail || null,
        content: sanitizedContent,
      });
    } catch (error) {
      console.error(`Error fetching blog post ${req.params.slug}:`, error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, service } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const emailContent = `
New Contact Form Submission from Ozark Web Works

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
${service ? `Service Requested: ${service}` : ''}

Message:
${message}
      `.trim();

      const { client: resend, fromEmail } = await getUncachableResendClient();

      const { data, error } = await resend.emails.send({
        from: fromEmail || 'Ozark Web Works <onboarding@resend.dev>',
        to: ['klewis@ozarkwebworks.com'],
        replyTo: email,
        subject: `New Contact Form: ${name}`,
        text: emailContent,
      });

      if (error) {
        console.error("Error sending email:", error);
        
        if (error.message?.includes('domain is not verified')) {
          console.log("\n⚠️  DOMAIN VERIFICATION NEEDED:");
          console.log("Please verify ozarkwebworks.com at https://resend.com/domains");
          console.log("Or add klewis@ozarkwebworks.com as a verified recipient for testing\n");
        }
        
        return res.status(500).json({ 
          error: "Failed to send email",
          details: error.message 
        });
      }

      res.json({ success: true, messageId: data?.id });
    } catch (error: any) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        error: "Failed to process contact form",
        details: error?.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
