import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
