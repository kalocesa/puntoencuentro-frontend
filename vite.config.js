import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@icons": resolve(__dirname, "./src/assets/icons"),
      "@components": resolve(__dirname, "./src/components"),
      "@images": resolve(__dirname, "./src/images"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
  },
});
