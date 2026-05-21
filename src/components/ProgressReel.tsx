import { levels } from "@/data/levels";

export function ProgressReel({ completed }: { completed: string[] }) {
  return (
    <div className="film-strip rounded-md bg-reel px-3 py-4 text-paper shadow-soft">
      <div className="grid grid-cols-6 gap-2">
        {levels.map((level) => {
          const isDone = completed.includes(level.id);
          return (
            <div
              aria-label={`${level.title} ${isDone ? "completed" : "not completed"}`}
              className={`flex aspect-square items-center justify-center rounded-sm border text-sm font-black ${
                isDone ? "border-gold bg-gold text-ink" : "border-paper/40 bg-paper/10 text-paper/60"
              }`}
              key={level.id}
              title={level.title}
            >
              {level.order}
            </div>
          );
        })}
      </div>
    </div>
  );
}
