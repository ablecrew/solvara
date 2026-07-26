import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatWidget from "@/components/ui/AIChatWidget";
import CookieBanner from "@/components/ui/CookieBanner";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";

const BASE_URL = "https://solvarasolutions.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Solvara Solutions | Solutions That Drive Growth",
    template: "%s | Solvara Solutions",
  },
  description:
    "Solvara Solutions builds modern, fast and scalable websites and web applications for businesses across Kenya and Africa. Web development, graphic design, UI/UX and custom systems.",
  keywords: [
    "web development Kenya",
    "website design Nairobi",
    "e-commerce Kenya",
    "M-Pesa integration",
    "hospital management system Kenya",
    "graphic design Nairobi",
    "Next.js developer Kenya",
    "Solvara Solutions",
  ],
  authors: [{ name: "Solvara Solutions", url: BASE_URL }],
  creator: "Solvara Solutions",
  publisher: "Solvara Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "Solvara Solutions",
    title: "Solvara Solutions | Solutions That Drive Growth",
    description:
      "Modern web development, graphic design and digital solutions for businesses in Kenya and Africa.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Solvara Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvara Solutions",
    description: "Modern web development and digital solutions for Kenyan businesses.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D518C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Solvara Solutions",
              description:
                "Web development, graphic design and digital solutions for businesses in Kenya and Africa.",
              url: BASE_URL,
              telephone: "+254707528980",
              email: "solvarasolutions@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2921,
                longitude: 36.8219,
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "17:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "10:00", closes: "16:00" },
              ],
              sameAs: [
                "https://github.com/ablecrew",
                "https://www.linkedin.com/in/teddy-dande-0b804b310/",
              ],
              priceRange: "KES 500 - KES 480,000",
              currenciesAccepted: "KES",
              paymentAccepted: "M-Pesa, Bank Transfer",
              areaServed: ["Kenya", "East Africa", "Africa"],
              serviceType: [
                "Web Development",
                "Graphic Design",
                "UI/UX Design",
                "E-Commerce Development",
                "Hospital Management Systems",
                "Custom Web Applications",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIChatWidget />
        <CookieBanner />
      </body>
    </html>
  );
}