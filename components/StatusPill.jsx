export default function StatusPill({ status }) {
  const styles = {
    NORMAL: "bg-green-600 text-white",
    WARNING: "bg-fg-warning text-white",
    CRITICAL: "bg-fg-critical text-white",
    INFO: "bg-fg-info text-white",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
        styles[status] || "bg-ink/10 text-ink"
      }`}
    >
      {status}
    </span>
  );
}
