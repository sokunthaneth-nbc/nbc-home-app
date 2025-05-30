import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
};

export default withFlowbiteReact(nextConfig);