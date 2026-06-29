import SectionBadge from "./SectionBadge";

export default function SectionHeader({ badge, title, highlight, subtitle }: {
  badge: string; title: string; highlight: string; subtitle?: string;
}) {
  return (
    <div className="text-center mb-14">
      <SectionBadge text={badge} />
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
        {title} <span className="text-gradient-green">{highlight}</span>
      </h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}