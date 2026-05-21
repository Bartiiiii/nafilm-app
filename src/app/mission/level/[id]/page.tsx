"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Check, Radio, RotateCcw, ScanLine } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { levels } from "@/data/levels";
import { getBadge, getLevel, getNextLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function LevelPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const progress = useAppState();
  const level = getLevel(params.id);
  const [scanned, setScanned] = useState(false);
  const [selected, setSelected] = useState("");
  const [showReward, setShowReward] = useState(false);

  const completedLevel = useMemo(
    () => progress.completedLevels.find((entry) => entry.levelId === params.id),
    [params.id, progress.completedLevels]
  );

  if (!level) {
    return (
      <div className="content-wrap rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <h1 className="text-2xl font-black text-ink">Room not found</h1>
        <p className="mt-2 text-sm leading-6 text-ink/60">This mission room is not in the current MVP route set.</p>
        <div className="mt-5">
          <ButtonLink href="/mission" variant="secondary">
            Mission Map
          </ButtonLink>
        </div>
      </div>
    );
  }

  const badge = getBadge(level.badgeId);
  const nextLevel = getNextLevel(progress);
  const followingLevel = levels.find((candidate) => candidate.order === level.order + 1);
  const canSubmit = Boolean(selected);

  function handleComplete() {
    if (!level || !canSubmit) {
      return;
    }

    progress.actions.completeLevel(level.id, selected);
    setShowReward(true);
  }

  function handlePrimaryCta() {
    if (!level) {
      router.push("/mission");
      return;
    }

    const alreadyFinished = progress.completedLevels.length + (completedLevel ? 0 : 1) >= levels.length;
    router.push(alreadyFinished ? "/mission/result" : `/mission/level/${followingLevel?.id ?? levels[0].id}`);
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow={`Level ${level.order}`} title={level.title} />

      <section className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">{level.room}</p>
          <h2 className="mt-3 text-2xl font-black text-ink">Room mission</h2>
          <p className="mt-3 text-base leading-7 text-ink/50">{level.description}</p>

          <div className="mt-5 rounded-md bg-frame p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50">Physical task</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink">{level.physicalTask}</p>
          </div>

          <div className="mt-5">
            {completedLevel ? (
              <div className="rounded-md border border-gold/50 bg-gold/20 p-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="text-gold" size={23} />
                  <p className="font-black text-ink">{badge?.title ?? "Badge earned"}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/60">
                  You completed this room with "{completedLevel.selectedOption}".
                </p>
              </div>
            ) : showReward ? (
              <RewardPanel badgeTitle={badge?.title ?? "Badge"} points={level.points} onContinue={handlePrimaryCta} />
            ) : scanned ? (
              <InteractionPanel
                canSubmit={canSubmit}
                level={level}
                onComplete={handleComplete}
                selected={selected}
                setSelected={setSelected}
              />
            ) : (
              <ActionButton className="w-full" icon={ScanLine} onClick={() => setScanned(true)}>
                Scan QR / NFC
              </ActionButton>
            )}
          </div>
        </div>

        <aside className="rounded-md bg-ink p-5 text-paper shadow-soft">
          <Radio className="text-gold" size={28} />
          <h2 className="mt-4 text-2xl font-black">{badge?.title ?? "Room badge"}</h2>
          <p className="mt-2 text-sm leading-6 text-paper/50">{badge?.description}</p>
          <div className="mt-5 rounded-md bg-paper/10 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-paper/50">Reward</p>
            <p className="mt-2 text-3xl font-black text-gold">+{level.points}</p>
            <p className="text-sm font-semibold text-paper/60">Film Credits</p>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="/mission" icon={RotateCcw} variant="secondary">
              Mission Map
            </ButtonLink>
            {completedLevel ? (
              <ButtonLink href={isMissionComplete(progress) ? "/mission/result" : `/mission/level/${nextLevel?.id ?? levels[0].id}`} icon={ArrowRight} variant="secondary">
                {isMissionComplete(progress) ? "Result" : "Next Room"}
              </ButtonLink>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}

function InteractionPanel({
  canSubmit,
  level,
  onComplete,
  selected,
  setSelected,
}: {
  canSubmit: boolean;
  level: NonNullable<ReturnType<typeof getLevel>>;
  onComplete: () => void;
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black text-ink">{level.question}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {level.options.map((option) => (
          <button
            className={`focus-ring min-h-14 rounded-md border px-4 text-left text-sm font-bold transition ${
              selected === option ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper hover:bg-frame"
            }`}
            key={option}
            onClick={() => setSelected(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <ActionButton className="w-full" disabled={!canSubmit} icon={Check} onClick={onComplete}>
        Claim Badge
      </ActionButton>
    </div>
  );
}

function RewardPanel({
  badgeTitle,
  onContinue,
  points,
}: {
  badgeTitle: string;
  onContinue: () => void;
  points: number;
}) {
  return (
    <div className="rounded-md border border-gold/50 bg-gold/20 p-5">
      <BadgeCheck className="text-gold" size={28} />
      <h3 className="mt-3 text-2xl font-black text-ink">{badgeTitle}</h3>
      <p className="mt-1 text-sm font-bold text-ink/50">+{points} Film Credits</p>
      <ActionButton className="mt-5 w-full" icon={ArrowRight} onClick={onContinue}>
        Continue
      </ActionButton>
    </div>
  );
}
