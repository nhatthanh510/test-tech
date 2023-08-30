import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/soap-endpoint": {
        target: "http://aam-test-server.aam-preprod.com:49162",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})