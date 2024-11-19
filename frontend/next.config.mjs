/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: "http://10.150.160.237:5047",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
