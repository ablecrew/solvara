"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft,
  User, Mail, Phone, Briefcase, FileText, Loader2,
  ChevronLeft, ChevronRight, MapPin, Video,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type DateInfo = { date: string; label: string; dayName: string; available: boolean };
type TimeSlot  = { time: string; available: boolean };
type Step      = 1 | 2 | 3 | 4;

const SERVICES = [
  "Business / Corporate Website",
  "E-Commerce Website",
  "Personal / Portfolio Website",
  "Hospital / Clinic System",
  "Government / Institutional Site",
  "Custom Web Application",
  "Graphic Design",
  "UI/UX Design",
  "General Consultation",
  "Other",
];

/* ─── Step indicator ─────────────────────────────────────────── */
function StepDot({ n, current, done }: { n: number; current: Step; done: boolean }) {
  const active = n === current;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300"
        style={
          done    ? { background: "#2ECC71", color: "#0A0E1A" } :
          active  ? { background: "#0D518C", color: "#fff", boxShadow: "0 0 20px rgba(13,81,140,0.5)" } :
                    { background: "#1A2540", color: "#6B7280" }
        }
      >
        {done ? <CheckCircle2 size={16} /> : n}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function BookPage() {
  const [step, setStep]             = useState<Step>(1);
  const [dates, setDates]           = useState<DateInfo[]>([]);
  const [slots, setSlots]           = useState<TimeSlot[]>([]);
  const [dateOffset, setDateOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [bookingRef, setBookingRef]     = useState("");
  const [error, setError]               = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", notes: "",
  });

  const DATES_PER_PAGE = 6;
  const visibleDates   = dates.slice(dateOffset, dateOffset + DATES_PER_PAGE);
  const canPrev        = dateOffset > 0;
  const canNext        = dateOffset + DATES_PER_PAGE < dates.length;

  /* Load available dates */
  useEffect(() => {
    fetch("/api/book")
      .then((r) => r.json())
      .then((d) => { setDates(d.dates ?? []); setLoadingDates(false); })
      .catch(() => setLoadingDates(false));
  }, []);

  /* Load slots when date changes */
  const loadSlots = useCallback(async (date: string) => {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedTime("");
    try {
      const r = await fetch(`/api/book?date=${date}`);
      const d = await r.json();
      setSlots(d.slots ?? []);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const selectDate = (date: string) => {
    setSelectedDate(date);
    loadSlots(date);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res  = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed.");
      setBookingRef(data.bookingRef);
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDateInfo = dates.find((d) => d.date === selectedDate);

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-gray-500 outline-none transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid #1A2540" };
  const focusStyle = (e: React.FocusEvent<HTMLElement>) => ((e.target as HTMLElement).style.borderColor = "#2ECC71");
  const blurStyle  = (e: React.FocusEvent<HTMLElement>) => ((e.target as HTMLElement).style.borderColor = "#1A2540");

  return (
    <div className="bg-[#0A0E1A] min-h-screen">
      {/* Grid bg */}
      <div aria-hidden className="fixed inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(13,81,140,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(13,81,140,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
            style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}>
            — FREE CONSULTATION —
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Book a{" "}
            <span style={{ background: "linear-gradient(135deg,#2ECC71,#3DE882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Free 30-Min Call
            </span>
          </h1>
          <p className="text-gray-400">No commitment. No sales pressure. Just an honest conversation about your project.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Video size={12} style={{ color: "#2ECC71" }} /> Zoom / Google Meet / Phone</span>
            <span className="flex items-center gap-1"><Clock size={12} style={{ color: "#2ECC71" }} /> 30 minutes</span>
            <span className="flex items-center gap-1"><MapPin size={12} style={{ color: "#2ECC71" }} /> Nairobi EAT (UTC+3)</span>
          </div>
        </div>

        {/* Step indicators */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {([1, 2, 3] as const).map((n, i) => (
              <div key={n} className="flex items-center gap-2">
                <StepDot n={n} current={step} done={step > n} />
                {i < 2 && <div className="w-12 h-px" style={{ background: step > n + 1 ? "#2ECC71" : "#1A2540" }} />}
              </div>
            ))}
          </div>
        )}

        {/* ─── STEP 1: Pick a date ─── */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <h2 className="text-white font-black text-xl mb-1 flex items-center gap-2">
                  <Calendar size={20} style={{ color: "#2ECC71" }} /> Choose a Date
                </h2>
                <p className="text-gray-500 text-sm mb-6">Mon – Sat · 8:00 AM – 7:00 PM EAT</p>

                {loadingDates ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 size={32} className="animate-spin" style={{ color: "#2ECC71" }} />
                  </div>
                ) : (
                  <>
                    {/* Date navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => setDateOffset((o) => Math.max(0, o - DATES_PER_PAGE))}
                        disabled={!canPrev}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-30"
                        style={{ background: "rgba(255,255,255,0.05)", color: "#9CA3AF" }}>
                        <ChevronLeft size={16} /> Prev
                      </button>
                      <span className="text-gray-400 text-sm">
                        {visibleDates[0]?.label?.split(" ").slice(1).join(" ")} –{" "}
                        {visibleDates[visibleDates.length - 1]?.label?.split(" ").slice(1).join(" ")}
                      </span>
                      <button onClick={() => setDateOffset((o) => o + DATES_PER_PAGE)}
                        disabled={!canNext}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-30"
                        style={{ background: "rgba(255,255,255,0.05)", color: "#9CA3AF" }}>
                        Next <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Date grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                      {visibleDates.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => d.available && selectDate(d.date)}
                          disabled={!d.available}
                          className="p-4 rounded-xl text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background: selectedDate === d.date ? "rgba(13,81,140,0.3)" : "rgba(255,255,255,0.03)",
                            border: selectedDate === d.date ? "2px solid #0D518C" : "1px solid #1A2540",
                            boxShadow: selectedDate === d.date ? "0 0 20px rgba(13,81,140,0.3)" : "none",
                            transform: selectedDate === d.date ? "scale(1.02)" : "scale(1)",
                          }}
                        >
                          <div className="text-xs font-bold mb-1" style={{ color: selectedDate === d.date ? "#2ECC71" : "#6B7280" }}>
                            {d.dayName}
                          </div>
                          <div className="text-white font-black text-base leading-tight">{d.label.split(" ")[0]} {d.label.split(" ")[1]}</div>
                          <div className="text-gray-500 text-xs mt-1">{d.label.split(" ").slice(2).join(" ")}</div>
                          {!d.available && <div className="text-xs mt-1" style={{ color: "#E74C3C" }}>Full</div>}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedDate}
                      className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
                      style={{ background: selectedDate ? "#2ECC71" : "#1A2540", color: selectedDate ? "#0A0E1A" : "#6B7280" }}>
                      Continue — Pick a Time <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Pick a time ─── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-white font-black text-xl mb-1 flex items-center gap-2">
                  <Clock size={20} style={{ color: "#2ECC71" }} /> Choose a Time
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  {selectedDateInfo?.dayName}, {selectedDateInfo?.label} · All times in EAT (Nairobi)
                </p>

                {loadingSlots ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin" style={{ color: "#2ECC71" }} />
                  </div>
                ) : (
                  <>
                    {/* AM slots */}
                    {["Morning (8 AM – 12 PM)", "Afternoon (12 PM – 5 PM)", "Evening (5 PM – 7 PM)"].map((label, period) => {
                      const filtered = slots.filter((s) => {
                        const h = parseInt(s.time.split(":")[0]);
                        if (period === 0) return h >= 8  && h < 12;
                        if (period === 1) return h >= 12 && h < 17;
                        return h >= 17;
                      });
                      if (filtered.length === 0) return null;
                      return (
                        <div key={label} className="mb-5">
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {filtered.map((s) => (
                              <button
                                key={s.time}
                                onClick={() => s.available && setSelectedTime(s.time)}
                                disabled={!s.available}
                                className="py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                                style={{
                                  background: selectedTime === s.time ? "#0D518C" : s.available ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                                  border: selectedTime === s.time ? "2px solid #2ECC71" : "1px solid #1A2540",
                                  color: selectedTime === s.time ? "#fff" : s.available ? "#D1D5DB" : "#4B5563",
                                  boxShadow: selectedTime === s.time ? "0 0 16px rgba(13,81,140,0.4)" : "none",
                                }}>
                                {s.time}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedTime}
                      className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-base transition-all mt-4 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
                      style={{ background: selectedTime ? "#2ECC71" : "#1A2540", color: selectedTime ? "#0A0E1A" : "#6B7280" }}>
                      Continue — Your Details <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: Details form ─── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-white font-black text-xl mb-1 flex items-center gap-2">
                  <User size={20} style={{ color: "#2ECC71" }} /> Your Details
                </h2>

                {/* Booking summary */}
                <div className="flex items-center gap-4 p-4 rounded-xl mb-6"
                  style={{ background: "rgba(46,204,113,0.08)", border: "1px solid rgba(46,204,113,0.2)" }}>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Your appointment</div>
                    <div className="text-white font-black">{selectedDateInfo?.label}</div>
                    <div className="font-bold text-sm" style={{ color: "#2ECC71" }}>{selectedTime} EAT</div>
                  </div>
                  <button onClick={() => setStep(1)} className="ml-auto text-xs text-gray-500 hover:text-white underline transition-colors">Change</button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <User size={11} /> Full Name *
                      </label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="John Mwangi" className={inputClass} style={inputStyle}
                        onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <Mail size={11} /> Email Address *
                      </label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="john@company.com" className={inputClass} style={inputStyle}
                        onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <Phone size={11} /> Phone / WhatsApp *
                      </label>
                      <input name="phone" value={form.phone} onChange={handleChange} required
                        placeholder="+254 700 000 000" className={inputClass} style={inputStyle}
                        onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <Briefcase size={11} /> Service Interested In *
                      </label>
                      <select name="service" value={form.service} onChange={handleChange} required
                        className={inputClass} style={{ ...inputStyle, color: form.service ? "#fff" : "#6b7280" }}
                        onFocus={focusStyle} onBlur={blurStyle}>
                        <option value="" disabled>Select a service...</option>
                        {SERVICES.map((s) => <option key={s} value={s} style={{ background: "#0F1629" }}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 flex items-center gap-1">
                      <FileText size={11} /> Tell Us About Your Project (optional)
                    </label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                      placeholder="Brief description of what you need..."
                      className={inputClass} style={{ ...inputStyle, resize: "none" }}
                      onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4"
                    style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)", color: "#f87171" }}>
                    ⚠️ {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.name || !form.email || !form.phone || !form.service}
                  className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-base transition-all disabled:opacity-50 hover:scale-[1.02]"
                  style={{ background: "#2ECC71", color: "#0A0E1A", boxShadow: "0 0 24px rgba(46,204,113,0.3)" }}>
                  {submitting ? <><Loader2 size={18} className="animate-spin" /> Confirming...</> : <>Confirm Booking <CheckCircle2 size={18} /></>}
                </button>

                <p className="text-gray-600 text-xs text-center mt-3">
                  By booking you agree to our{" "}
                  <Link href="/terms-of-service" className="underline" style={{ color: "#2ECC71" }}>Terms of Service</Link>
                </p>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 4: Confirmed ─── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="rounded-2xl p-8 text-center" style={{ background: "#0F1629", border: "1px solid rgba(46,204,113,0.3)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(46,204,113,0.15)", border: "2px solid #2ECC71", boxShadow: "0 0 40px rgba(46,204,113,0.25)" }}>
                  <CheckCircle2 size={40} style={{ color: "#2ECC71" }} />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-bold"
                  style={{ background: "rgba(46,204,113,0.1)", color: "#2ECC71" }}>
                  BOOKING CONFIRMED 🎉
                </div>
                <h2 className="text-white font-black text-2xl mb-2">See You Soon, {form.name.split(" ")[0]}!</h2>
                <p className="text-gray-400 text-sm mb-2">Booking Ref: <strong className="text-white">{bookingRef}</strong></p>
                <div className="rounded-2xl p-5 my-6 text-left"
                  style={{ background: "rgba(46,204,113,0.06)", border: "1px solid rgba(46,204,113,0.15)" }}>
                  <div className="text-white font-black text-lg">{selectedDateInfo?.label}</div>
                  <div className="font-bold" style={{ color: "#2ECC71" }}>{selectedTime} EAT (Nairobi)</div>
                  <div className="text-gray-400 text-sm mt-1">{form.service}</div>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  A confirmation email has been sent to <strong className="text-white">{form.email}</strong>.
                  We&apos;ll contact you on WhatsApp or phone before the session.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/254707528980" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
                    style={{ background: "#25A85E", color: "#fff" }}>
                    💬 WhatsApp Us
                  </a>
                  <Link href="/"
                    className="flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-all hover:brightness-125 text-white"
                    style={{ background: "rgba(13,81,140,0.2)", border: "1px solid rgba(13,81,140,0.3)" }}>
                    Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar info */}
        {step < 4 && (
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle2, color: "#2ECC71", title: "100% Free",          desc: "No payment required for consultation" },
              { icon: Video,        color: "#0D518C", title: "Your Choice",         desc: "Zoom, Google Meet, or a phone call" },
              { icon: Clock,        color: "#2ECC71", title: "30 Minutes",          desc: "Focused, no-fluff conversation" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#0F1629", border: "1px solid #1A2540" }}>
                <c.icon size={18} style={{ color: c.color }} className="shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold text-sm">{c.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}