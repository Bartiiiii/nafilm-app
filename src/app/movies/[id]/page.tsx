"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { MoviePoster } from "@/components/MoviePoster";
import { getMovie, getRecommendations } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function MovieDetailPage() {
  const params = useParams<{ id: string }>();
  const progress = useAppState();
  const movie = getMovie(params.id);

  if (!movie) {
    return (
      <div className="content-wrap rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <h1 className="text-2xl font-black text-ink">Movie not found</h1>
        <div className="mt-5">
          <ButtonLink href="/movies" variant="secondary">
            Movies
          </ButtonLink>
        </div>
      </div>
    );
  }

  const saved = progress.savedMovies.includes(movie.id);
  const moreLikeThis = getRecommendations(progress).filter((entry) => entry.id !== movie.id).slice(0, 3);

  return (
    <div className="content-wrap space-y-7">
      <section className="grid gap-5 lg:grid-cols-[0.58fr_1fr]">
        <MoviePoster movie={movie} />

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">{movie.year}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-ink">{movie.title}</h1>
          <p className="mt-4 text-base leading-7 text-ink/50">{movie.description}</p>

          <div className="mt-5 rounded-md bg-frame p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50">Why recommended</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink">{movie.reason}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <TagPanel title="Mood" tags={movie.tags} />
            <TagPanel title="Technique" tags={movie.techniqueTags} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ActionButton
              icon={saved ? BookmarkCheck : Bookmark}
              onClick={() => (saved ? progress.actions.unsaveMovie(movie.id) : progress.actions.saveMovie(movie.id))}
              variant={saved ? "secondary" : "primary"}
            >
              {saved ? "Saved" : "Save"}
            </ActionButton>
            <a
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-paper px-4 text-sm font-bold text-ink ring-1 ring-ink/10"
              href={movie.trailerUrl}
            >
              <ExternalLink aria-hidden="true" size={18} />
              <span>Trailer Soon</span>
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-ink/10 bg-paper/75 p-5">
        <h2 className="text-2xl font-black text-ink">More like this</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {moreLikeThis.map((entry) => (
            <Link className="rounded-md bg-frame p-3 text-sm font-black text-ink" href={`/movies/${entry.id}`} key={entry.id}>
              {entry.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function TagPanel({ tags, title }: { tags: string[]; title: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span className="rounded-sm bg-ink px-2 py-1 text-[11px] font-bold text-paper" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
