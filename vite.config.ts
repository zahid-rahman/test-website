import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";

export default defineConfig({
  ssr: {
    noExternal: ["@remix-run/node"], // Ensure these modules are bundled
  },
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
});
