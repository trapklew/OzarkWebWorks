import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // 1. Ensures /admin files are copied from /client/public/admin
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
  // 2. Tells Vite to use the 'client' directory as the base
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // 3. FIX: Outputs to the path expected by the production server (dist/public)
    outDir: path.resolve(import.meta.dirname, "dist/public"), 
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});