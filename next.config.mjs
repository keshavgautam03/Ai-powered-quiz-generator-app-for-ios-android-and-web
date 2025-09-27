/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static export for Capacitor
  output: 'export',
  trailingSlash: true,
  // Disable server-side features that don't work with static export
  experimental: {
    esmExternals: false,
  },
  // Optimize for mobile
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
