/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    dangerouslyAllowSVG: true,
    domains: ['*'],
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during production builds for now
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 