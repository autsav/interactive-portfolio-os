import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Turbopack auto-detects root via lockfiles; a stray ~/package-lock.json was
  // making it infer /Users/utsab1 as the workspace root. Pin it here so only this
  // project is watched/resolved.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;