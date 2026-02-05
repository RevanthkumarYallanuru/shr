import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for deployment (use "/" for root domain)
  base: "/",
  
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  
  // Build configuration
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    // Ensure assets have consistent naming
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "@radix-ui/react-dialog", "@radix-ui/react-popover"],
        },
        // Consistent asset naming for caching
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Preview server (for local testing of production build)
  preview: {
    port: 8080,
    host: true,
  },
});
