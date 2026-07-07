"use client";

export default function QuickActionCard({ icon: Icon, title, description, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-xl2 border border-ink/5 bg-white/70 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* field-row texture, signature accent */}
      <span
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <div
        className="grid h-11 w-11 place-items-center rounded-lg"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        <Icon size={20} strokeWidth={2} />
      </div>
      <div>
        <p className="font-display text-base font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-ink/60">{description}</p>
      </div>
    </button>
  );
}
