

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//     allowedDevOrigins: ['192.168.1.75'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '/**',
//       },
//     ],
//     formats: ['image/avif', 'image/webp'],
//     minimumCacheTTL: 60,
//   },
  
//   serverExternalPackages: ['cloudinary', 'bcryptjs', 'jose'],
  
//   experimental: {
//     optimizePackageImports: [
//       '@radix-ui/react-dialog',
//       '@radix-ui/react-dropdown-menu',
//       '@radix-ui/react-select',
//       '@radix-ui/react-tabs',
//     ],
//   },
  
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production' ? {
//       exclude: ['error', 'warn'],
//     } : false,
//   },
  
//   headers: async () => [
//     {
//       source: '/(.*)',
//       headers: [
//         { key: 'X-Frame-Options', value: 'DENY' },
//         { key: 'X-Content-Type-Options', value: 'nosniff' },
//         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
//       ],
//     },
//   ],
// }

// export default nextConfig


import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // Cache images for 1 day
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  serverExternalPackages: ['cloudinary', 'bcryptjs', 'jose'],
  
  // Compress responses
  compress: true,
  
  // Optimize imports
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'lucide-react',
      'framer-motion',
    ],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Cache static assets
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'no-store' },
      ],
    },
  ],
}

export default nextConfig