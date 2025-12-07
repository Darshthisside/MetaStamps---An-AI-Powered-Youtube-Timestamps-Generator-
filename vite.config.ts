import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/webhook": {
        // Proxies to: https://limitable-draftily-soon.ngrok-free.dev/webhook/stamps
        target: "https://limitable-draftily-soon.ngrok-free.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, "/webhook/stamps"),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("ngrok-skip-browser-warning", "true");
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
