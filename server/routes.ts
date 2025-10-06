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
const resend = new Resend(process.env.RESEND_API_KEY);

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

      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY not configured");
        return res.status(500).json({ error: "Email service not configured" });
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

      const { data, error } = await resend.emails.send({
        from: 'Ozark Web Works <onboarding@resend.dev>',
        to: ['klewis@ozarkwebworks.com'],
        replyTo: email,
        subject: `New Contact Form: ${name}`,
        text: emailContent,
      });

      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      res.json({ success: true, messageId: data?.id });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
