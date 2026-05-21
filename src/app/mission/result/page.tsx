"use client";

import { useEffect } from "react";
import { Clapperboard, Gamepad2, Share2, Sparkles } from "lucide-react";
import { BadgeGrid } from "@/components/BadgeGrid";
import { ButtonLink } from "@/components/ButtonLink";
import { EmptyState } from "@/components/EmptyState";
import { MoviePoster } from "@/components/MoviePoster";
import { ProgressReel } from "@/components/ProgressReel";
import { SectionHeader } from "@/components/SectionHeader";
import { levels } from "@/data/levels";
import { getRecommendations, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function MissionResultPage() {
  const progress = useAppState();
  const complete = isMissionComplete(progress);
  const recommendations = getRecommendations(progress);

  useEffect(() => {
    if (complete && !progress.finalIdentity) {
      progress.actions.finalizeMission();
    }
  }, [complete, progress]);

  if (!complete) {
    return (
      <div className="content-wrap">
        <EmptyState
          action="Continue Mission"
          body="Complete all six MVP rooms to reveal your film identity and unlock the movie list."
          href="/mission"
          title="The final reel is still loading"
        />
      </div>
    );
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Final result" title={progress.finalIdentity ?? "Auteur"} />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md bg-ink p-6 text-paper shadow-soft">
          <Sparkles className="text-gold" size={30} />
          <h2 className="mt-5 text-3xl font-black">Your filmmaker identity is set.</h2>
          <p className="mt-3 text-sm leading-6 text-paper/50">
            You completed {levels.length} rooms, earned {progress.badges.length} badges, and turned your choices into a
            recommendation profile.
          </p>
          <div className="mt-5">
            <ProgressReel completed={progress.completedLevels.map((level) => level.levelId)} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ButtonLink href="/movies" icon={Clapperboard} variant="secondary">
              Top 5 Movies
            </ButtonLink>
            <ButtonLink href="/mini-game" icon={Gamepad2} variant="secondary">
              Film Run
            </ButtonLink>
            <button
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-paper text-sm font-bold text-ink ring-1 ring-ink/10"
              type="button"
            >
              <Share2 aria-hidden="true" size={18} />
              <span>Share Soon</span>
            </button>
          </div>
        </div>

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
          <h2 className="text-2xl font-black text-ink">Your Top 5 starts here</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-3">
            {recommendations.map((movie) => (
              <a href={`/movies/${movie.id}`} key={movie.id}>
                <MoviePoster compact movie={movie} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black text-ink">Badges earned</h2>
        <BadgeGrid earned={progress.badges} />
      </section>
    </div>
  );
}
