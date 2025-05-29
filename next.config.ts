import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  /* config options here */
};

export default withFlowbiteReact(nextConfig);