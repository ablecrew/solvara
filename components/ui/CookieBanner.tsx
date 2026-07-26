"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X, CheckCircle2, Settings } from "lucide-react";

type Consent = {
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "solvara_cookie_consent";

export default function CookieBanner() {
  const [show, setShow]         = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs]       = useState<Consent>({ analytics: true, marketing: false });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setTimeout(() => setShow(true), 2000);
  }, []);

  const save = (consent: Consent & { necessary: boolean }) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }));

    // Enable/disable GA4 based on consent
    if (typeof window !== "undefined") {
      // @ts-expect-error gtag not typed
      window.gtag?.("consent", "update", {
        analytics_storage:    consent.analytics  ? "granted" : "denied",
        ad_storage:           consent.marketing  ? "granted" : "denied",
        functionality_storage: "granted",
        security_storage:     "granted",
      });
    }
    setShow(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const savePrefs = () => save({ necessary: true, ...prefs });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "#0F1629",
              border: "1px solid #1A2540",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid #1A2540" }}
            >
              <div className="flex items-center gap-2">
                <Cookie size={18} style={{ color: "#2ECC71" }} />
                <span className="text-white font-bold text-sm">Cookie Preferences</span>
              </div>
              <button
                onClick={rejectAll}
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Close and reject optional cookies"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We use cookies to improve your experience, analyse traffic and personalise content.
                By clicking <strong className="text-white">Accept All</strong>, you consent to our use of cookies.
                {" "}
                <Link href="/cookie-policy" className="underline" style={{ color: "#2ECC71" }}>
                  Learn more
                </Link>
              </p>

              {/* Detailed preferences */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-3">
                      {/* Necessary — always on */}
                      <div
                        className="flex items-start justify-between gap-3 p-3 rounded-xl"
                        style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}
                      >
                        <div>
                          <div className="text-white text-xs font-bold">Necessary</div>
                          <div className="text-gray-500 text-xs mt-0.5">Essential for the site to function. Cannot be disabled.</div>
                        </div>
                        <div className="shrink-0">
                          <div
                            className="w-10 h-5 rounded-full flex items-center justify-end px-0.5"
                            style={{ background: "#2ECC71" }}
                          >
                            <div className="w-4 h-4 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics */}
                      <div
                        className="flex items-start justify-between gap-3 p-3 rounded-xl"
                        style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}
                      >
                        <div>
                          <div className="text-white text-xs font-bold">Analytics</div>
                          <div className="text-gray-500 text-xs mt-0.5">Helps us understand how visitors use our site (Google Analytics 4).</div>
                        </div>
                        <button
                          onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                          className="shrink-0 w-10 h-5 rounded-full flex items-center px-0.5 transition-all"
                          style={{ background: prefs.analytics ? "#2ECC71" : "#1A2540", justifyContent: prefs.analytics ? "flex-end" : "flex-start" }}
                          aria-checked={prefs.analytics}
                          role="switch"
                        >
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </button>
                      </div>

                      {/* Marketing */}
                      <div
                        className="flex items-start justify-between gap-3 p-3 rounded-xl"
                        style={{ background: "#0A0E1A", border: "1px solid #1A2540" }}
                      >
                        <div>
                          <div className="text-white text-xs font-bold">Marketing</div>
                          <div className="text-gray-500 text-xs mt-0.5">Used for personalised ads and conversion tracking.</div>
                        </div>
                        <button
                          onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                          className="shrink-0 w-10 h-5 rounded-full flex items-center px-0.5 transition-all"
                          style={{ background: prefs.marketing ? "#2ECC71" : "#1A2540", justifyContent: prefs.marketing ? "flex-end" : "flex-start" }}
                          aria-checked={prefs.marketing}
                          role="switch"
                        >
                          <div className="w-4 h-4 rounded-full bg-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={acceptAll}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{ background: "#2ECC71", color: "#0A0E1A" }}
                >
                  <CheckCircle2 size={15} /> Accept All Cookies
                </button>

                <div className="flex gap-2">
                  {showDetails ? (
                    <button
                      onClick={savePrefs}
                      className="flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all"
                      style={{ background: "rgba(13,81,140,0.2)", color: "#93c5fd", border: "1px solid rgba(13,81,140,0.3)" }}
                    >
                      Save My Preferences
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowDetails(true)}
                      className="flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#9CA3AF", border: "1px solid #1A2540" }}
                    >
                      <Settings size={12} /> Manage Preferences
                    </button>
                  )}
                  <button
                    onClick={rejectAll}
                    className="flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280", border: "1px solid #1A2540" }}
                  >
                    Reject Optional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}