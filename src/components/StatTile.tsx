export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper/50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">{label}</p>
      <p className="mt-2 text-2xl font-black text-ink">{value}</p>
    </div>
  );
}
