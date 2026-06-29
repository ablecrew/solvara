export default function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4">
      <span className="text-accent text-sm font-semibold">— {text} —</span>
    </div>
  );
}

