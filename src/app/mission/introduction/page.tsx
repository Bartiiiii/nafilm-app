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
            Film wasn't created suddenly by some genius. Rather, it gradually developed over the
            course of several centuries, dependent on many inventions stretching back to antiquity.
            By the end of the nineteenth century, all these separate discoveries came together —
            leading to the independent appearance of the first cameras and projectors.
          </p>
          <p>
            Ever since ancient drawings of hunters and animals covered the walls of caves, and
            friezes decorated Egyptian tombs, mankind has sought to capture motion. By the
            nineteenth century, new scientific discoveries in optics made it possible to simulate
            movement through a series of still images. It was a long journey — the first attempts
            were far from the practical projections we know today.
          </p>
          <p>
            Nevertheless, the principle remained the same: a rapid succession of slightly different
            still images, shown in fractions of seconds, creates the illusion of continuous
            movement. The first ones were hand-painted, and the resulting films lasted only a few
            seconds. It took several more decades before photography made it possible to capture
            hundreds of images and transfer them onto a transparent filmstrip — and only then could
            the illusion of motion be projected onto a screen.
          </p>
          <p>
            At the end of 1895, with all technical requirements finally overcome, the first public
            film performance met with astonishing success — and a new era of media was born.
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="rounded-md border border-ink/10 bg-paper/75 p-5">
        <p className="text-sm leading-6 text-ink/70">
          You are about to walk through <strong className="text-ink">12 rooms</strong>, each
          dedicated to a different chapter in the history of cinema. Complete each room's challenge,
          collect Film Credits, and discover the magic behind the moving image.
        </p>
        <ActionButton className="mt-4 w-full" icon={ArrowRight} onClick={handleStart}>
          Let's start
        </ActionButton>
      </section>
    </div>
  );
}
