import { badges } from "@/data/badges";

export function BadgeGrid({ earned }: { earned: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => {
        const isEarned = earned.includes(badge.id);
        return (
          <div
            className={`rounded-md border p-4 ${
              isEarned ? "border-gold/50 bg-gold/20" : "border-ink/10 bg-paper/50 opacity-60"
            }`}
            key={badge.id}
          >
            <p className="text-sm font-black text-ink">{badge.title}</p>
            <p className="mt-1 text-xs leading-5 text-ink/50">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
