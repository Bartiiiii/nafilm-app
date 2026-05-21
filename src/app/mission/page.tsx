"use client";

import Link from "next/link";
import { ArrowRight, Check, Clapperboard, LockKeyhole, Play } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressReel } from "@/components/ProgressReel";
import { SectionHeader } from "@/components/SectionHeader";
import { levels } from "@/data/levels";
import { getBadge, getNextLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function MissionPage() {
  const progress = useAppState();
  const completedIds = progress.completedLevels.map((level) => level.levelId);
  const nextLevel = getNextLevel(progress);
  const completed = isMissionComplete(progress);
  const level1Done = completedIds.length > 0;

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Mission" title="The Filmmaker's Journey." />

      <section className="rounded-md border border-ink/10 bg-paper/75 p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-ink">
            {completed
              ? "Your final identity, movie recommendations, and Film Run are unlocked."
              : "Step into the crew. Complete each room's mission, collect credits, and discover the magic of Czech cinema."}
          </p>
          <ButtonLink
            href={completed ? "/mission/result" : `/mission/level/${nextLevel?.id ?? levels[0].id}`}
            icon={completed || level1Done ? ArrowRight : Play}
          >
            {completed ? "View Result" : level1Done ? "Continue" : "Start mission"}
          </ButtonLink>
        </div>
      </section>

      <ProgressReel completed={completedIds} />

      <section className="grid gap-3">
        {/* Introduction block */}
        <div className="flex items-center gap-4 rounded-md border border-ink/10 bg-ink p-4 shadow-soft">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-paper/10">
            <Clapperboard className="text-gold" size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-paper/50">Start here</p>
            <h3 className="mt-0.5 text-lg font-black text-paper">Introduction</h3>
            <p className="mt-0.5 text-sm leading-5 text-paper/50">The Birth of Film: The World and Pictures in Motion</p>
          </div>
        </div>

        {levels.map((level) => {
          const completedLevel = progress.completedLevels.find((entry) => entry.levelId === level.id);
          const isDone = Boolean(completedLevel);
          const isCurrent = nextLevel?.id === level.id;
          const isLocked = !progress.missionStarted && !isDone;
          const badge = getBadge(level.badgeId);

          return (
            <Link
              className={`grid gap-4 rounded-md border p-4 shadow-soft transition sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                isDone
                  ? "border-gold/50 bg-gold/20"
                  : isCurrent
                    ? "border-ink bg-paper"
                    : "border-ink/10 bg-paper/50"
              } ${isLocked ? "pointer-events-none opacity-58" : "hover:-translate-y-0.5"}`}
              href={`/mission/level/${level.id}`}
              key={level.id}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md text-lg font-black ${
                  isDone ? "bg-gold text-ink" : "bg-ink text-paper"
                }`}
              >
                {isDone ? <Check aria-hidden="true" size={22} /> : level.order}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">{level.room}</p>
                <h3 className="mt-1 text-xl font-black text-ink">{level.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink/60">{badge?.title ?? "Badge"} · +{level.points} credits</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-ink/50">
                {isLocked ? <LockKeyhole size={18} /> : null}
                <span>{isDone ? "Done" : isCurrent ? "Next" : isLocked ? "Locked" : "Open"}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
