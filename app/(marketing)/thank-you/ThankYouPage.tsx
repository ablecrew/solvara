import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Message Sent | Solvara Solutions",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen flex items-center justify-center px-4">
      <div
        aria-hidden
        className="fixed inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,81,140,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden
        className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Animated checkmark */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background: "rgba(46,204,113,0.15)",
            border: "2px solid rgba(46,204,113,0.4)",
            boxShadow: "0 0 60px rgba(46,204,113,0.25)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
          style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.25)", color: "#2ECC71" }}
        >
          MESSAGE RECEIVED 🎉
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          We&apos;ll Be In Touch{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#2ECC71,#3DE882)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shortly!
          </span>
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          Your enquiry has been received and a confirmation has been sent to your email.
          Our team will respond within <strong className="text-white">2 hours</strong> — often much sooner.
        </p>

        {/* What happens next */}
        <div
          className="rounded-2xl p-6 text-left mb-8"
          style={{ background: "#0F1629", border: "1px solid #1A2540" }}
        >
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">What Happens Next</p>
          <div className="space-y-3">
            {[
              { n: "01", color: "#2ECC71", text: "Our team reviews your brief carefully" },
              { n: "02", color: "#0D518C", text: "We schedule a free 30-min discovery call" },
              { n: "03", color: "#2ECC71", text: "You receive a detailed proposal & quote" },
              { n: "04", color: "#0D518C", text: "We kick off your project — let's build!" },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: s.color, color: s.color === "#2ECC71" ? "#0A0E1A" : "#fff" }}
                >
                  {s.n}
                </div>
                <span className="text-gray-300 text-sm">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct contact */}
        <p className="text-gray-500 text-sm mb-4">Can&apos;t wait? Reach us directly:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            href="https://wa.me/254792837632"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
            style={{ background: "#25A85E", color: "#fff" }}
          >
            💬 WhatsApp Us
          </a>
          <a
            href="tel:+254792837632"
            className="flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm text-white transition-all hover:brightness-125"
            style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)" }}
          >
            📞 +254 792 837 632
          </a>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: "#2ECC71" }}
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}