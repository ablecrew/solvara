import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Image domains ───────────────────────────────────────── */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  /* ── Security headers ────────────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          // Referrer policy
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unnecessary browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          // HSTS — enforce HTTPS for 1 year
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://www.google-analytics.com https://www.googletagmanager.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.resend.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  /* ── Redirects ───────────────────────────────────────────── */
  async redirects() {
    return [
      // Redirect www to non-www (set your real domain)
      // { source: "/(.*)", has: [{ type: "host", value: "www.solvara.tech" }], destination: "https://solvara.tech/:path*", permanent: true },
    ];
  },
};

export default nextConfig;