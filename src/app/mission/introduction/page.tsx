"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { levels } from "@/data/levels";
import { useAppState } from "@/lib/useAppState";

export default function IntroductionPage() {
  const router = useRouter();
  const progress = useAppState();

  function handleStart() {
    progress.actions.startMission();
    router.push(`/mission/level/${levels[0].id}`);
  }

  return (
    <div className="content-wrap space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Introduction</p>
          <h1 className="mt-1 text-3xl font-black text-ink">The Birth of Film</h1>
          <p className="mt-0.5 text-sm font-semibold text-ink/50">
            The World and Pictures in Motion
          </p>
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

      {/* Introduction content */}
      <section className="rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <div className="space-y-4 text-sm leading-7 text-ink/70">
          <p>
            Film wasn't created by a single genius — it developed over centuries, built on discoveries
            in optics, photography, and projection. At the end of 1895, all these inventions finally
            came together, and the first public film performance was born.
          </p>
          <p>
            You are about to walk through <strong className="text-ink">12 rooms</strong>, each
            dedicated to a different chapter in the history of cinema. Complete each room's challenge,
            collect Film Credits, and discover the magic behind the moving image.
          </p>
        </div>
        <ActionButton className="mt-6 w-full" icon={ArrowRight} onClick={handleStart}>
          Let's start
        </ActionButton>
      </section>
    </div>
  );
}
