import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";

import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(), 
      tailwindcss(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
