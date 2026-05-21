"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, BookmarkCheck, RotateCw, Shuffle } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { EmptyState } from "@/components/EmptyState";
import { MoviePoster } from "@/components/MoviePoster";
import { SectionHeader } from "@/components/SectionHeader";
import { getMovie, getRecommendations, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function MoviesPage() {
  const progress = useAppState();
  const [pickedMovieId, setPickedMovieId] = useState<string | null>(null);
  const complete = isMissionComplete(progress);
  const recommendations = getRecommendations(progress);
  const savedMovies = progress.savedMovies.flatMap((id) => {
    const movie = getMovie(id);
    return movie ? [movie] : [];
  });
  const pickedMovie = pickedMovieId ? getMovie(pickedMovieId) : null;

  if (!complete) {
    return (
      <div className="content-wrap">
        <EmptyState
          action="Finish Mission"
          body="Movie recommendations unlock after the six-room filmmaker journey."
          href="/mission"
          title="Top 5 movies are waiting"
        />
      </div>
    );
  }

  function spinReel() {
    const randomMovie = recommendations[Math.floor(Math.random() * recommendations.length)];
    setPickedMovieId(randomMovie.id);
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Movies" title="Top 5 movies you should watch.">
        <ActionButton icon={Shuffle} onClick={spinReel}>
          Spin the Reel
        </ActionButton>
      </SectionHeader>

      {pickedMovie ? (
        <section className="rounded-md border border-gold/50 bg-gold/20 p-5 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-ember">Spin result</p>
              <h2 className="mt-1 text-2xl font-black text-ink">{pickedMovie.title}</h2>
              <p className="mt-1 text-sm leading-6 text-ink/50">{pickedMovie.reason}</p>
            </div>
            <ButtonLink href={`/movies/${pickedMovie.id}`} icon={RotateCw} variant="secondary">
              Open Movie
            </ButtonLink>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-5">
        {recommendations.map((movie, index) => {
          const saved = progress.savedMovies.includes(movie.id);
          return (
            <article className="rounded-md border border-ink/10 bg-paper/100 p-3 shadow-soft" key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <MoviePoster movie={movie} />
              </Link>
              <div className="mt-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-teal">Pick {index + 1}</p>
                <h2 className="mt-1 text-lg font-black leading-tight text-ink">{movie.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/60">{movie.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.tags.slice(0, 3).map((tag) => (
                    <span className="rounded-sm bg-frame px-2 py-1 text-[11px] font-bold text-ink/60" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <ActionButton
                  className="mt-4 w-full"
                  icon={saved ? BookmarkCheck : Bookmark}
                  onClick={() => (saved ? progress.actions.unsaveMovie(movie.id) : progress.actions.saveMovie(movie.id))}
                  variant={saved ? "secondary" : "primary"}
                >
                  {saved ? "Saved" : "Save"}
                </ActionButton>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-md border border-ink/10 bg-paper/75 p-5">
        <h2 className="text-2xl font-black text-ink">Watch later</h2>
        {savedMovies.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {savedMovies.map((movie) => (
              <Link
                className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-paper"
                href={`/movies/${movie.id}`}
                key={movie.id}
              >
                {movie.title}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm leading-6 text-ink/60">Saved films will appear here.</p>
        )}
      </section>
    </div>
  );
}
