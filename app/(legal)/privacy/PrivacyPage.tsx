import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Solvara Solutions",
  description: "Solvara Solutions privacy policy — how we collect, use and protect your personal data under the Kenya Data Protection Act 2019.",
};

const sections = [
  {
    title: "1. Who We Are",
    content: `Solvara Solutions ("Solvara", "we", "our", "us") is a web development and technology consultancy registered in Nairobi, Kenya. We operate the website at solvara.vercel.app and provide digital services including web development, graphic design, UI/UX design and technology consulting.

Contact: solvarasolutions@gmail.com | +254 707 528 980 | Nairobi, Kenya`,
  },
  {
    title: "2. What Data We Collect",
    content: `We collect the following categories of personal data:

• Contact information: name, email address, phone number, company name
• Project information: service requirements, budget range, project timeline
• Communication data: messages you send us through our contact form
• Technical data: IP address, browser type, device type, pages visited, time spent on site (collected via Google Analytics 4)
• Cookie data: consent preferences, session identifiers

We do not collect sensitive personal data such as financial information, health data or national ID numbers.`,
  },
  {
    title: "3. How We Use Your Data",
    content: `We use your personal data for the following purposes:

• To respond to your enquiries and provide our services
• To send you project updates, proposals and invoices
• To send our newsletter (only with your explicit consent)
• To improve our website and services using anonymised analytics
• To comply with legal obligations under Kenyan law
• To protect against fraud and misuse of our services

Legal basis: Contractual necessity (service delivery), Legitimate interest (analytics, fraud prevention), and Consent (newsletter, marketing cookies).`,
  },
  {
    title: "4. How We Share Your Data",
    content: `We do not sell, rent or trade your personal data. We may share data with:

• Service providers: Resend (email delivery), Google Analytics (analytics), Vercel (hosting) — all subject to data processing agreements
• Legal authorities: when required by law or court order
• Business transfers: in the event of a merger or acquisition, with advance notice

All third-party providers are required to maintain the confidentiality and security of your data.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal data for as long as necessary:

• Contact form submissions: 2 years from date of submission
• Client project data: 5 years for tax and legal compliance
• Analytics data: 26 months (Google Analytics default)
• Newsletter subscriber data: until you unsubscribe

After retention periods expire, data is securely deleted or anonymised.`,
  },
  {
    title: "6. Your Rights (Kenya Data Protection Act 2019)",
    content: `Under the Kenya Data Protection Act 2019, you have the right to:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate or incomplete data
• Deletion: Request deletion of your personal data ("right to be forgotten")
• Portability: Receive your data in a machine-readable format
• Objection: Object to processing of your data for direct marketing
• Restriction: Request we restrict processing of your data
• Withdrawal of consent: Withdraw consent at any time without affecting past processing

To exercise any of these rights, email us at solvarasolutions@gmail.com. We will respond within 30 days.`,
  },
  {
    title: "7. Cookies",
    content: `We use cookies to improve your experience on our website. See our Cookie Policy for full details. You can manage your cookie preferences at any time using the cookie banner on our website.`,
  },
  {
    title: "8. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your data including:

• HTTPS encryption on all pages
• Secure API endpoints with rate limiting and input sanitisation
• Access controls limiting data access to authorised team members only
• Regular security reviews of our infrastructure

No method of transmission over the internet is 100% secure. We cannot guarantee absolute security but commit to using industry-standard practices.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not directed at children under the age of 18. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us immediately and we will delete it.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website and updating the "Last Updated" date below. Continued use of our website after changes constitutes acceptance.`,
  },
  {
    title: "11. Contact & Complaints",
    content: `For privacy-related questions or to exercise your rights:

Email: solvarasolutions@gmail.com
Phone: +254 707 528 980
Address: Nairobi, Kenya

If you are unsatisfied with how we handle your data, you may lodge a complaint with the Office of the Data Protection Commissioner (ODPC) of Kenya at www.odpc.go.ke.`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = "July 2026";

  return (
    <div className="bg-[#0A0E1A] min-h-screen pt-28 pb-20">
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-xs font-bold"
            style={{ background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71" }}
          >
            LEGAL DOCUMENT
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400">
            Last updated: <strong className="text-white">{lastUpdated}</strong>
            {" · "}
            Effective immediately
          </p>
          <p className="text-gray-400 mt-3 leading-relaxed">
            This policy explains how Solvara Solutions collects, uses and protects your personal
            data in compliance with the{" "}
            <strong className="text-white">Kenya Data Protection Act 2019</strong> and international
            best practices.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}
            >
              <h2 className="text-white font-black text-xl mb-4" style={{ color: "#2ECC71" }}>
                {s.title}
              </h2>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div
          className="mt-10 pt-8 flex flex-wrap gap-4"
          style={{ borderTop: "1px solid #1A2540" }}
        >
          <Link href="/terms" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#2ECC71" }}>
            Terms of Service →
          </Link>
          <Link href="/cookie" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#2ECC71" }}>
            Cookie Policy →
          </Link>
          <Link href="/contact" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "#2ECC71" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}