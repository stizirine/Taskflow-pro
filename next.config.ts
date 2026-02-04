import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from "node:path";

const projectRoot = __dirname;
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Force Turbopack to use this project as the workspace root
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: path.join(
        projectRoot,
        "node_modules/tailwindcss/index.css",
      ),
      "tw-animate-css": path.join(
        projectRoot,
        "node_modules/tw-animate-css/dist/tw-animate.css",
      ),
    },
  },
};

export default withNextIntl(nextConfig)
