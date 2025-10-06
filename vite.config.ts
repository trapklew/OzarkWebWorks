import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "public/admin", dest: "" }],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // Final Corrected vite.config.js section
  build: {
    // Use a simple relative path: from the 'client' root (set below)
    // jump up one level (..) to the repository root, then into dist/public
    outDir: "../dist/public",
    emptyOutDir: true,
  },

  // (Ensure this line is still present in the config to define the starting point)
  root: path.resolve(import.meta.dirname, "client"),
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
