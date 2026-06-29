import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solvara Technologies | Solutions That Drive Growth",
  description:
    "We build modern, fast and scalable websites and web applications that help your business stand out, win trust and grow online.",
  keywords: [
    "web development Kenya",
    "e-commerce Kenya",
    "website design Nairobi",
    "M-Pesa integration",
    "Solvara Technologies",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}