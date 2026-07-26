import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Solvara Solutions",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0A0E1A" }}
    >
      {/* Grid bg */}
      <div
        aria-hidden
        className="fixed inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,81,140,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Glitch 404 */}
        <div
          className="font-black leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(6rem,20vw,10rem)",
            background: "linear-gradient(135deg,#0D518C,#2ECC71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(46,204,113,0.3))",
          }}
        >
          404
        </div>

        <h1 className="text-white font-black text-2xl sm:text-3xl mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            { label: "Home",      href: "/" },
            { label: "Services",  href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Contact",   href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 text-gray-300 hover:text-white"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1A2540" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
          style={{
            background: "#2ECC71",
            color: "#0A0E1A",
            boxShadow: "0 0 28px rgba(46,204,113,0.35)",
          }}
        >
          ← Go Back Home
        </Link>
      </div>
    </div>
  );
}