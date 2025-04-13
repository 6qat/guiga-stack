import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouterDevTools } from "react-router-devtools";

export default defineConfig({
  css: {
    postcss: {
      plugins: [],
    },
  },
  plugins: [
    process.env.NODE_ENV === "development" ? reactRouterDevTools() : [],
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve:
    process.env.NODE_ENV === "development"
      ? {}
      : {
          alias: {
            "react-dom/server": "react-dom/server.node",
          },
        },
});
