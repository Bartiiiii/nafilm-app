"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { MiniGame } from "@/components/MiniGame";
import { levels } from "@/data/levels";
import { getBadge, getLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function LevelPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const progress = useAppState();
  const level = getLevel(params.id);

  const [gameComplete, setGameComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [curioOpen, setCurioOpen] = useState(false);

  const completedLevel = useMemo(
    () => progress.completedLevels.find((entry) => entry.levelId === params.id),
    [params.id, progress.completedLevels]
  );

  if (!level) {
    return (
      <div className="content-wrap rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <h1 className="text-2xl font-black text-ink">Room not found</h1>
        <p className="mt-2 text-sm leading-6 text-ink/60">This room is not in the current route.</p>
      </div>
    );
  }

  const badge = getBadge(level.badgeId);
  const followingLevel = levels.find((l) => l.order === level.order + 1);
  const alreadyDone = Boolean(completedLevel);

  function handleGameComplete() {
    if (alreadyDone) return;
    setGameComplete(true);
    progress.actions.completeLevel(level!.id, "completed");
    setTimeout(() => setShowReward(true), 300);
  }

  function handleContinue() {
    const allDone =
      progress.completedLevels.length + (completedLevel ? 0 : 1) >= levels.length;
    router.push(allDone ? "/mission/result" : `/mission/level/${followingLevel?.id ?? levels[0].id}`);
  }

  return (
    <div className="content-wrap space-y-6">
      {/* Back button */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">
            Room {level.order} of {levels.length}
          </p>
          <h1 className="mt-1 text-3xl font-black text-ink">{level.title}</h1>
          <p className="mt-0.5 text-sm font-semibold text-ink/50">{level.room}</p>
        </div>
        <button
          aria-label="Back to mission"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper transition hover:border-ink/40 hover:bg-frame"
          onClick={() => router.push("/mission")}
          type="button"
        >
          <ArrowLeft size={16} />
        </button>
      </div>

      {/* Description */}
      <section className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        <p className="text-sm leading-7 text-ink/70">{level.description}</p>
      </section>

      {/* Minigame or already-done state */}
      <section className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        {alreadyDone || showReward ? (
          <RewardPanel
            badge={badge?.title ?? "Badge"}
            onContinue={handleContinue}
            points={level.points}
            showContinue={alreadyDone || showReward}
          />
        ) : (
          <MiniGame game={level.game} onComplete={handleGameComplete} />
        )}
      </section>

      {/* For the Curious */}
      <section className="rounded-md border border-ink/10 bg-paper/75 shadow-soft">
        <button
          className="flex w-full items-center justify-between p-5 text-left transition hover:bg-frame"
          onClick={() => setCurioOpen((v) => !v)}
          type="button"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-ember">
              For the Curious
            </p>
            <p className="mt-0.5 text-base font-black text-ink">Dig deeper into this room</p>
          </div>
          <ChevronDown
            className={`shrink-0 text-ink/40 transition-transform duration-200 ${curioOpen ? "rotate-180" : ""}`}
            size={20}
          />
        </button>

        {curioOpen && (
          <div className="border-t border-ink/10 px-5 pb-5 pt-4">
            <ul className="space-y-4">
              {level.curioFacts.map((fact, i) => (
                <li className="flex gap-3 text-sm leading-6 text-ink/70" key={i}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

function RewardPanel({
  badge,
  points,
  onContinue,
  showContinue,
}: {
  badge: string;
  points: number;
  onContinue: () => void;
  showContinue: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BadgeCheck className="shrink-0 text-gold" size={28} />
        <div>
          <p className="text-lg font-black text-ink">{badge}</p>
          <p className="text-sm font-semibold text-ink/50">+{points} Film Credits earned</p>
        </div>
      </div>
      {showContinue && (
        <ActionButton className="w-full" icon={ArrowRight} onClick={onContinue}>
          Continue to next room
        </ActionButton>
      )}
    </div>
  );
}
