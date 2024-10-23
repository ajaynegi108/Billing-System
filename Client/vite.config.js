import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // exclude: ["grapesjs", "grapesjs-preset-newsletter"], // Add problematic dependencies here
  },
});
