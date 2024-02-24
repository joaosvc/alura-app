/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALURA_API_URL: process.env.ALURA_API_URL,
  },
};

export default nextConfig;
