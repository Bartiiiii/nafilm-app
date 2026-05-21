"use client";

import Link from "next/link";
import { ArrowRight, Check, LockKeyhole, Map, Play } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressReel } from "@/components/ProgressReel";
import { SectionHeader } from "@/components/SectionHeader";
import { StatTile } from "@/components/StatTile";
import { levels } from "@/data/levels";
import { getBadge, getNextLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function MissionPage() {
  const progress = useAppState();
  const completedIds = progress.completedLevels.map((level) => level.levelId);
  const nextLevel = getNextLevel(progress);
  const completed = isMissionComplete(progress);

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Mission" title="The Filmmaker's Journey.">
        {progress.missionStarted ? null : (
          <ActionButton icon={Play} onClick={() => progress.actions.startMission()}>
            Start Mission
          </ActionButton>
        )}
      </SectionHeader>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Role" value={progress.finalIdentity ?? (progress.missionStarted ? "Trainee" : "Visitor")} />
        <StatTile label="Film Credits" value={progress.points} />
        <StatTile label="Rooms" value={`${completedIds.length}/${levels.length}`} />
      </section>

      <ProgressReel completed={completedIds} />

      <section className="rounded-md border border-ink/10 bg-paper/75 p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-ink">
              {completed ? "Mission complete" : nextLevel ? nextLevel.title : "Ready for the next room"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-ink/60">
              {completed
                ? "Your final identity, movie recommendations, and Film Run are unlocked."
                : "Scan the room marker in the prototype, answer one quick prompt, and move on."}
            </p>
          </div>
          <ButtonLink href={completed ? "/mission/result" : `/mission/level/${nextLevel?.id ?? levels[0].id}`} icon={ArrowRight}>
            {completed ? "View Result" : "Continue"}
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-3">
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
                {isLocked ? <LockKeyhole size={18} /> : <Map size={18} />}
                <span>{isDone ? "Done" : isCurrent ? "Next" : "Open"}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
