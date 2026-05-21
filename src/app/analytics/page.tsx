"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useAppState } from "@/lib/useAppState";

export default function AnalyticsPage() {
  const progress = useAppState();

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Prototype analytics" title="Local event log." />
      <section className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        {progress.analytics.length ? (
          <div className="divide-y divide-ink/10">
            {progress.analytics.map((event, index) => (
              <div className="grid gap-2 py-3 text-sm sm:grid-cols-[180px_1fr_1fr]" key={`${event.createdAt}-${index}`}>
                <p className="font-black text-ink">{event.event}</p>
                <p className="font-semibold text-ink/60">{new Date(event.createdAt).toLocaleString()}</p>
                <p className="break-all font-mono text-xs text-ink/60">{event.meta ? JSON.stringify(event.meta) : "{}"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-ink/60">Events appear after ticket, mission, movie, mini-game, and reward actions.</p>
        )}
      </section>
    </div>
  );
}
