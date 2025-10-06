import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'public/admin', dest: '' }
      ]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // Tells Vite to use the 'client' directory as the base source
  root: path.resolve(import.meta.dirname, "client"), 
  build: {
    // 🔑 FIX: This outputs the client build to the root's /dist/public folder,
    // which is where your server code is looking.
    outDir: path.resolve(import.meta.dirname, "../dist/public"), 
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});