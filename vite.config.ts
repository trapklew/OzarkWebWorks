import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // Correct path relative to the 'root' defined below
        { src: 'public/admin', dest: '' }
      ]
    }),
  ],
  resolve: {
    alias: {
      // Keep your aliases
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // Tells Vite to use the 'client' directory as the base
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // Outputs directly to /client/dist (where Netlify is looking)
    outDir: "dist", 
    emptyOutDir: true,
  },
  // Keep your server settings
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});