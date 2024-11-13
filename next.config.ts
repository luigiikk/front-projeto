import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/users',
        destination: 'https://api-test-ouk9.onrender.com/users',
      },
      {
        source: '/api/user',
        destination: 'https://api-test-ouk9.onrender.com/user',
      },
    ];
  },
};

export default nextConfig;
