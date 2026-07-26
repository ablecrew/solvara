import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Solvara Solutions",
  description: "Terms and conditions governing use of Solvara Solutions services — payments, intellectual property, revisions, warranties and dispute resolution.",
};

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `By engaging Solvara Solutions ("Solvara", "we", "us") for any service or accessing our website at solvara.vercel.app, you ("Client", "you") agree to be bound by these Terms of Service. If you do not agree, do not use our services.

These terms form the entire agreement between you and Solvara and supersede any prior communications.`,
  },
  {
    title: "2. Services",
    content: `Solvara provides web development, graphic design, UI/UX design, and technology consulting services. The specific scope of work, deliverables, timeline and pricing for each project are agreed in writing (via proposal, invoice or project brief) before work commences.

We reserve the right to refuse service to anyone for any reason.`,
  },
  {
    title: "3. Payment Terms",
    content: `• All projects require a 50% deposit before work begins. The remaining 50% is due upon project completion before final files or live deployment are handed over.
• For larger projects (over KES 100,000), milestone-based payment schedules may be agreed in writing.
• Graphic design orders (under KES 5,000) require full payment upfront.
• All prices are quoted in Kenyan Shillings (KES) and are exclusive of any applicable taxes.
• Payment is accepted via M-Pesa, bank transfer or as agreed in writing.
• Late payments beyond 14 days of invoice date incur a 5% monthly interest charge.
• Solvara retains ownership of all work until full payment is received.`,
  },
  {
    title: "4. Revisions",
    content: `• All web projects include two rounds of revisions at each stage (design and development).
• Graphic design projects include two rounds of revisions per deliverable.
• Additional revisions beyond the included rounds are charged at KES 500–2,000 per revision depending on complexity.
• Revisions must be requested within 14 days of delivery. After this period, changes are treated as new work.
• Revision requests must be submitted in a single consolidated list, not incrementally.`,
  },
  {
    title: "5. Intellectual Property",
    content: `• Upon receipt of full payment, Solvara assigns all intellectual property rights in the final delivered work to the Client.
• Solvara retains the right to display the work in its portfolio, case studies and marketing materials unless the Client requests otherwise in writing.
• All third-party assets (stock images, fonts, plugins, libraries) remain subject to their respective licences. The Client is responsible for ensuring ongoing compliance.
• Solvara retains all rights to any proprietary tools, templates, frameworks or code components used in delivering the project that are not specific to the Client's project.`,
  },
  {
    title: "6. Client Responsibilities",
    content: `The Client agrees to:
• Provide all required content, assets, credentials and feedback in a timely manner.
• Designate a single point of contact for project communication.
• Review and approve deliverables within 7 days of submission (silence after 7 days constitutes approval).
• Ensure all content provided is owned by the Client or properly licensed.
• Not hold Solvara liable for delays caused by the Client's failure to provide required materials.`,
  },
  {
    title: "7. Timeline",
    content: `• Estimated delivery timelines are stated in project proposals. They are estimates, not guarantees.
• Timelines begin from the date the deposit is received and the project brief is complete.
• Timelines may be extended if the Client delays in providing content, feedback or approvals.
• Solvara will communicate any anticipated delays as soon as they become known.`,
  },
  {
    title: "8. Warranties & Limitation of Liability",
    content: `• Solvara warrants that delivered work will materially conform to the agreed specification.
• Solvara does not warrant that websites will be free of all bugs or security vulnerabilities indefinitely after handover.
• Solvara is not liable for: loss of revenue, loss of data, business interruption, or any indirect or consequential damages arising from use of our services.
• Solvara's total liability for any claim shall not exceed the amount paid by the Client for the specific project giving rise to the claim.
• Solvara is not liable for third-party services (hosting, payment gateways, SMS providers) or their outages.`,
  },
  {
    title: "9. Confidentiality",
    content: `Both parties agree to keep confidential all non-public information shared during the engagement. Solvara will not disclose Client business information to third parties without written consent, except as required by law.`,
  },
  {
    title: "10. Cancellation",
    content: `• The Client may cancel a project at any time by written notice.
• The deposit (50%) is non-refundable if work has commenced.
• If work beyond the deposit stage has been completed, the Client is liable for the pro-rata value of work completed.
• Solvara may terminate the engagement if the Client breaches these terms, with refund of unused portions of payment.`,
  },
  {
    title: "11. Governing Law & Disputes",
    content: `These terms are governed by the laws of Kenya. Any dispute shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to mediation in Nairobi before resorting to litigation.`,
  },
  {
    title: "12. Changes to Terms",
    content: `Solvara reserves the right to update these terms at any time. Changes are effective upon posting to our website. Continued engagement with our services after changes constitutes acceptance. For active projects, changes do not apply retroactively.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#0A0E1A] min-h-screen pt-28 pb-20">
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-xs font-bold"
            style={{ background: "rgba(13,81,140,0.15)", border: "1px solid rgba(13,81,140,0.3)", color: "#93c5fd" }}
          >
            LEGAL DOCUMENT
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
          <p className="text-gray-400">
            Last updated: <strong className="text-white">July 2026</strong>
            {" · "}
            Governing law: <strong className="text-white">Republic of Kenya</strong>
          </p>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Please read these terms carefully before engaging Solvara Solutions for any service.
            By proceeding with a project, you agree to be bound by these terms.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "#0F1629", border: "1px solid #1A2540" }}
            >
              <h2 className="font-black text-xl mb-4" style={{ color: "#1A6BB5" }}>
                {s.title}
              </h2>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 flex flex-wrap gap-4" style={{ borderTop: "1px solid #1A2540" }}>
          <Link href="/privacy" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#2ECC71" }}>
            Privacy Policy →
          </Link>
          <Link href="/cookie" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#2ECC71" }}>
            Cookie Policy →
          </Link>
          <Link href="/contact" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: "#2ECC71" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}