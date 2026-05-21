import type { Movie } from "@/types";

const palettes = [
  ["#12100f", "#ce5a35", "#f2eadc"],
  ["#2f6f73", "#d69e2e", "#fbf7ef"],
  ["#6e476d", "#25211f", "#f2eadc"],
  ["#5f7560", "#12100f", "#d69e2e"],
  ["#ce5a35", "#2f6f73", "#fbf7ef"],
];

export function MoviePoster({ movie, compact = false }: { movie: Movie; compact?: boolean }) {
  const palette = palettes[movie.title.length % palettes.length];

  return (
    <div
      className={`relative overflow-hidden rounded-md shadow-soft ${compact ? "aspect-[4/5]" : "aspect-[2/3]"}`}
      style={{
        background: `linear-gradient(145deg, ${palette[0]} 0%, ${palette[1]} 64%, ${palette[2]} 64%)`,
      }}
    >
      <div className="absolute inset-x-3 top-3 h-2 rounded-full bg-paper/75" />
      <div className="absolute bottom-0 left-0 right-0 bg-ink/100 p-3 text-paper">
        <p className="text-sm font-black leading-tight">{movie.title}</p>
        <p className="mt-1 text-xs font-semibold text-paper/50">{movie.year}</p>
      </div>
      <div className="absolute left-4 top-8 h-16 w-16 rounded-full border-[10px] border-paper/50" />
      <div className="absolute right-5 top-24 h-10 w-10 rounded-full bg-paper/50" />
    </div>
  );
}
