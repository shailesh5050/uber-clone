import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow external connections for mobile testing
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  cors: {
    origin: "*", // Allow your all's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  },
  build: {
    // Optimize for mobile performance
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['gsap', '@gsap/react']
        }
      }
    }
  }
});
