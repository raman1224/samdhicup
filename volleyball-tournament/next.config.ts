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
  
//   // For Next.js 16, use turbopack config instead of webpack
//   turbopack: {
//     // Empty config to acknowledge Turbopack
//   },
  
//   // serverExternalPackages moved from experimental
//   serverExternalPackages: ['cloudinary'],
  
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
//         { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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
    minimumCacheTTL: 60,
  },
  
  serverExternalPackages: ['cloudinary', 'bcryptjs', 'jose'],
  
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
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
      ],
    },
  ],
}

export default nextConfig