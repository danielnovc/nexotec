import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers for TLS 1.3
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self' blob: data:; frame-ancestors 'none';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // CORS configuration for API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Language-specific redirects for SEO
  async redirects() {
    return [
      // Redirect old landing structure to new structure
      {
        source: '/landing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/landing/de',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/landing/fr',
        destination: '/fr',
        permanent: true,
      },
      {
        source: '/landing/es',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/landing/pr',
        destination: '/pr',
        permanent: true,
      },
      {
        source: '/landing/pl',
        destination: '/pl',
        permanent: true,
      },
      {
        source: '/landing/ru',
        destination: '/ru',
        permanent: true,
      },
      {
        source: '/landing/ua',
        destination: '/ua',
        permanent: true,
      },
      {
        source: '/landing/lt',
        destination: '/lt',
        permanent: true,
      },
    ];
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Enable experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Optimize for production
  compress: true,
  poweredByHeader: false,


};

export default nextConfig;
