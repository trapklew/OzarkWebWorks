import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { google } from "googleapis";

const POSTS_DIR = path.join(process.cwd(), "blog");

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
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
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-mail",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Gmail not connected");
  }
  return accessToken;
}

async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
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

      const htmlContent = marked.parse(content) as string;
      const plainText = htmlContent.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      const excerpt = plainText.substring(0, 150);

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        thumbnail: data.thumbnail || null,
        category: data.category || "General",
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
        category: data.category || "General",
        content: sanitizedContent,
      });
    } catch (error) {
      console.error(`Error fetching blog post ${req.params.slug}:`, error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Chat widget messages
  app.post("/api/chat", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const emailContent = `New Chat Message from Ozark Web Works Website

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent via the chat widget.`;

      const gmail = await getUncachableGmailClient();

      const emailMessage = [
        `From: klewis@ozarkwebworks.com`,
        `To: klewis@ozarkwebworks.com`,
        `Reply-To: ${email}`,
        `Subject: Chat Message: ${name}`,
        "",
        emailContent,
      ].join("\n");

      const encodedMessage = Buffer.from(emailMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      res.json({ success: true, messageId: response.data.id });
    } catch (error: any) {
      console.error("Error processing chat message:", error);
      return res.status(500).json({ 
        error: "Failed to send message",
        details: error?.message 
      });
    }
  });

  // Consultation booking requests
  app.post("/api/consultation", async (req, res) => {
    try {
      const { name, email, phone, date, time, notes } = req.body;

      if (!name || !email || !date || !time) {
        return res.status(400).json({ error: "Name, email, date, and time are required" });
      }

      const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });

      const emailContent = `New Consultation Request from Ozark Web Works Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Requested Date: ${formattedDate}
Requested Time: ${time} (Central Time)

Notes:
${notes || 'No additional notes provided'}

---
Please confirm this appointment with the client.`;

      const gmail = await getUncachableGmailClient();

      const emailMessage = [
        `From: klewis@ozarkwebworks.com`,
        `To: klewis@ozarkwebworks.com`,
        `Reply-To: ${email}`,
        `Subject: Consultation Request: ${name} - ${formattedDate} at ${time}`,
        "",
        emailContent,
      ].join("\n");

      const encodedMessage = Buffer.from(emailMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      res.json({ success: true, messageId: response.data.id });
    } catch (error: any) {
      console.error("Error processing consultation request:", error);
      return res.status(500).json({ 
        error: "Failed to book consultation",
        details: error?.message 
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, service } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      const emailContent = `New Contact Form Submission from Ozark Web Works

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
${service ? `Service Requested: ${service}` : ''}

Message:
${message}`;

      const gmail = await getUncachableGmailClient();

      const emailMessage = [
        `From: klewis@ozarkwebworks.com`,
        `To: klewis@ozarkwebworks.com`,
        `Reply-To: ${email}`,
        `Subject: New Contact Form: ${name}`,
        "",
        emailContent,
      ].join("\n");

      const encodedMessage = Buffer.from(emailMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      res.json({ success: true, messageId: response.data.id });
    } catch (error: any) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        error: "Failed to send email",
        details: error?.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
