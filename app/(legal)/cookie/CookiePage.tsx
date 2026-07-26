import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | Solvara Solutions",
  description: "How Solvara Solutions uses cookies and similar technologies on our website.",
};

const cookieTypes = [
  {
    name: "Necessary Cookies",
    color: "#2ECC71",
    required: true,
    description: "These cookies are essential for the website to function and cannot be disabled. They are set in response to actions you take such as setting your cookie preferences.",
    examples: [
      { name: "solvara_cookie_consent", purpose: "Stores your cookie consent preferences", duration: "1 year" },
      { name: "__Secure-next-auth.session-token", purpose: "Maintains your session (if applicable)", duration: "Session" },
    ],
  },
  {
    name: "Analytics Cookies",
    color: "#3498DB",
    required: false,
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information is anonymised.",
    examples: [
      { name: "_ga", purpose: "Google Analytics — distinguishes unique users", duration: "2 years" },
      { name: "_ga_*", purpose: "Google Analytics — stores session state", duration: "2 years" },
      { name: "_gid", purpose: "Google Analytics — distinguishes users", duration: "24 hours" },
    ],
  },
  {
    name: "Marketing Cookies",
    color: "#9B59B6",
    required: false,
    description: "These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. We only activate these with your explicit consent.",
    examples: [
      { name: "_fbp", purpose: "Meta Pixel — tracks conversions from Facebook Ads", duration: "3 months" },
      { name: "ads/ga-audiences", purpose: "Google Ads remarketing", duration: "Session" },
    ],
  },
];

export default function CookiePage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen pt-28 pb-20">
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6">

        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-xs font-bold"
            style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}
          >
            LEGAL DOCUMENT
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Cookie Policy</h1>
          <p className="text-gray-400">Last updated: <strong className="text-white">July 2026</strong></p>
          <p className="text-gray-400 mt-3 leading-relaxed">
            This policy explains what cookies are, how Solvara Solutions uses them, and how you can control them.
          </p>
        </div>

        {/* What are cookies */}
        <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
          <h2 className="text-white font-black text-xl mb-3" style={{ color: "#2ECC71" }}>What Are Cookies?</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and provide a better experience. Cookies cannot run programs or deliver viruses and are completely safe.
          </p>
        </div>

        {/* Cookie types */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((ct) => (
            <div key={ct.name} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ct.color}25` }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: `${ct.color}10`, borderBottom: `1px solid ${ct.color}20` }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: ct.color }} />
                  <h3 className="text-white font-bold">{ct.name}</h3>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={ct.required
                    ? { background: "rgba(46,204,113,0.15)", color: "#2ECC71" }
                    : { background: "rgba(255,255,255,0.06)", color: "#9CA3AF" }}
                >
                  {ct.required ? "Always Active" : "Optional"}
                </span>
              </div>
              <div className="p-6" style={{ background: "#0F1629" }}>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{ct.description}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #1A2540" }}>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Cookie Name</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Purpose</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ct.examples.map((ex) => (
                        <tr key={ex.name} style={{ borderBottom: "1px solid #1A2540" }}>
                          <td className="py-2 px-3 font-mono" style={{ color: ct.color }}>{ex.name}</td>
                          <td className="py-2 px-3 text-gray-400">{ex.purpose}</td>
                          <td className="py-2 px-3 text-gray-500">{ex.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Managing cookies */}
        <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
          <h2 className="text-white font-black text-xl mb-3" style={{ color: "#2ECC71" }}>Managing Your Cookie Preferences</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            You can manage your cookie preferences at any time using our cookie banner (the popup that appears on your first visit). You can also control cookies through your browser settings:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { browser: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
              { browser: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" },
              { browser: "Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471" },
              { browser: "Microsoft Edge", url: "https://support.microsoft.com/en-us/microsoft-edge/view-cookies-in-microsoft-edge" },
            ].map((b) => (
              <a key={b.browser} href={b.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:brightness-125"
                style={{ background: "#0A0E1A", border: "1px solid #1A2540", color: "#2ECC71" }}>
                {b.browser} →
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Note: Disabling necessary cookies may affect site functionality.
          </p>
        </div>

        {/* Contact */}
        <div className="rounded-2xl p-6" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
          <h2 className="text-white font-black text-xl mb-3" style={{ color: "#2ECC71" }}>Questions?</h2>
          <p className="text-gray-400 text-sm">
            If you have questions about our use of cookies, email us at{" "}
            <a href="mailto:solvarasolutions@gmail.com" className="font-semibold" style={{ color: "#2ECC71" }}>
              solvarasolutions@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-10 pt-8 flex flex-wrap gap-4" style={{ borderTop: "1px solid #1A2540" }}>
          <Link href="/privacy" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#2ECC71" }}>Privacy Policy →</Link>
          <Link href="/terms" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#2ECC71" }}>Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}