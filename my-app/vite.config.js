import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import defaultTheme from 'tailwindcss/defaultTheme'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@configs": path.resolve(__dirname, "./src/configs"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@admin": path.resolve(__dirname, "./src/pages/admin"),
      "@client": path.resolve(__dirname, "./src/pages/client"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constant": path.resolve(__dirname, "./src/constants"),
    },
  },
  optimizeDeps: {
    include: ["react-number-format"]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans], 
      },
    },
  },
});
