/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: "http://192.168.0.103:5047",
  },
  // force build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
