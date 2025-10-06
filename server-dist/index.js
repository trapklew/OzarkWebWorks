// server/index.ts
import express2 from "express";
import path4 from "path";

// server/routes.ts
import { createServer } from "http";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { google } from "googleapis";
var POSTS_DIR = path.join(process.cwd(), "blog");
var connectionSettings;
async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
  if (!xReplitToken) {
    throw new Error("X_REPLIT_TOKEN not found for repl/depl");
  }
  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-mail",
    {
      headers: {
        Accept: "application/json",
        X_REPLIT_TOKEN: xReplitToken
      }
    }
  ).then((res) => res.json()).then((data) => data.items?.[0]);
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
    access_token: accessToken
  });
  return google.gmail({ version: "v1", auth: oauth2Client });
}
function getAllPostMetadata() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  const fileNames = fs.readdirSync(POSTS_DIR);
  return fileNames.filter((fileName) => fileName.endsWith(".md")).map((fileName) => {
    const fullPath = path.join(POSTS_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const plainText = content.replace(/[#*`\[\]()]/g, "").trim();
    const excerpt = plainText.substring(0, 150);
    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      date: data.date || (/* @__PURE__ */ new Date()).toISOString(),
      thumbnail: data.thumbnail || null,
      excerpt: excerpt || ""
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
async function registerRoutes(app2) {
  app2.get("/api/blog", (req, res) => {
    try {
      const posts = getAllPostMetadata();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", (req, res) => {
    try {
      const { slug } = req.params;
      const fullPath = path.join(POSTS_DIR, `${slug}.md`);
      if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: "Post not found" });
      }
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const htmlContent = marked.parse(content);
      const sanitizedContent = DOMPurify.sanitize(htmlContent);
      res.json({
        slug,
        title: data.title || "Untitled",
        date: data.date || (/* @__PURE__ */ new Date()).toISOString(),
        thumbnail: data.thumbnail || null,
        content: sanitizedContent
      });
    } catch (error) {
      console.error(`Error fetching blog post ${req.params.slug}:`, error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, service } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }
      const emailContent = `New Contact Form Submission from Ozark Web Works

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
${service ? `Service Requested: ${service}` : ""}

Message:
${message}`;
      const gmail = await getUncachableGmailClient();
      const emailMessage = [
        `From: klewis@ozarkwebworks.com`,
        `To: klewis@ozarkwebworks.com`,
        `Reply-To: ${email}`,
        `Subject: New Contact Form: ${name}`,
        "",
        emailContent
      ].join("\n");
      const encodedMessage = Buffer.from(emailMessage).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage
        }
      });
      res.json({ success: true, messageId: response.data.id });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({
        error: "Failed to send email",
        details: error?.message
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "public/admin", dest: "" }]
    })
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  // Final Corrected vite.config.js section
  build: {
    // Use a simple relative path: from the 'client' root (set below)
    // jump up one level (..) to the repository root, then into dist/public
    outDir: "../dist/public",
    emptyOutDir: true
  },
  // (Ensure this line is still present in the config to define the starting point)
  root: path2.resolve(import.meta.dirname, "client"),
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/images", express2.static(path4.join(process.cwd(), "images")));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
