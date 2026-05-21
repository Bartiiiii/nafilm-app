"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { catalogMovies } from "@/data/catalogMovies";
import type { CatalogMovie } from "@/types";
import { useAppState } from "@/lib/useAppState";

export default function MoviesPage() {
  const progress = useAppState();
  const hasQuiz = progress.quizAnswers !== null;

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Movies" title="Our recommendations." />

      {hasQuiz ? (
        <EmptyState
          action="Check Your Recommendations"
          body="Answer a few questions about your taste and we'll hand-pick the best Czech films just for you."
          href="/movies/quiz"
          title="Find your perfect film match"
          variant="gold"
        />
      ) : (
        <EmptyState
          action="Take the Quiz"
          body="Answer a few questions about your taste and we'll hand-pick the best Czech films just for you."
          href="/movies/quiz"
          title="Find your perfect film match"
        />
      )}

      <section>
        <h2 className="mb-4 text-2xl font-black text-ink">Film Library</h2>
        <div className="space-y-2">
          {catalogMovies.map((movie) => (
            <CatalogMovieCard
              key={movie.id}
              movie={movie}
              onSave={() => progress.actions.saveMovie(movie.id)}
              onUnsave={() => progress.actions.unsaveMovie(movie.id)}
              saved={progress.savedMovies.includes(movie.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CatalogMovieCard({
  movie,
  saved,
  onSave,
  onUnsave,
}: {
  movie: CatalogMovie;
  saved: boolean;
  onSave: () => void;
  onUnsave: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-ink/10 bg-paper/100 shadow-soft">
      <button
        className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-frame"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <div className="min-w-0 flex-1">
          <p className="text-lg font-black leading-tight text-ink">{movie.title}</p>
          <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.14em] text-ink/50">{movie.genre}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-base font-black text-ink">{movie.rating}</span>
          <ChevronDown
            className={`text-ink/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            size={18}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-ink/10 px-4 pb-4 pt-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 text-sm">
              <p className="text-ink/70"><span className="font-black text-ink">Year</span> {movie.year}</p>
              <p className="text-ink/70"><span className="font-black text-ink">Country</span> {movie.country}</p>
              <p className="text-ink/70"><span className="font-black text-ink">Director</span> {movie.director}</p>
            </div>
            <button
              aria-label={saved ? "Unsave movie" : "Save movie"}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                saved ? "bg-gold/20" : "bg-ink/8 hover:bg-ink/10"
              }`}
              onClick={(e) => { e.stopPropagation(); saved ? onUnsave() : onSave(); }}
              type="button"
            >
              <Star
                className={saved ? "text-gold" : "text-ink/30"}
                fill={saved ? "currentColor" : "none"}
                size={20}
              />
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/70">{movie.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.tags.map((tag) => (
              <span
                className="rounded-full border border-gold/60 bg-gold/20 px-3 py-0.5 text-[11px] font-bold text-ink/70"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
