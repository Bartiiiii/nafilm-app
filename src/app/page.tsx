"use client";

import { useState } from "react";
import { ArrowRight, Clapperboard, Gift, Map, Play, Star, Ticket } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FilmRunOverlay } from "@/components/FilmRunOverlay";
import { ProgressReel } from "@/components/ProgressReel";
import { levels } from "@/data/levels";
import { getLoyaltyStatus, getNextLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function HomePage() {
  const progress = useAppState();
  const completedIds = progress.completedLevels.map((level) => level.levelId);
  const nextLevel = getNextLevel(progress);
  const loyalty = getLoyaltyStatus(progress);
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div className="content-wrap space-y-7">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-md bg-ink p-6 text-paper shadow-soft sm:p-8" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-ink/60" />
          <div className="relative z-10 mb-4">
            <img
              alt="NaFilM Action"
              className="h-auto w-[5.5rem] sm:w-28"
              height={1488}
              src="/logo-action-green.png"
              width={2000}
            />
          </div>
          <p className="relative z-10 max-w-2xl text-base leading-7 text-paper/70">
            Enhance your museum experience by finishing missions, collecting points, exchanging them
            for rewards, and enjoying movie recommendations made for you!
          </p>
          <div className="relative z-10 mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/ticket" icon={Ticket} variant="secondary">
              {progress.ticket ? "View Ticket" : "Buy Ticket"}
            </ButtonLink>
            <ButtonLink href="/mission" icon={Map} variant="gold">
              {progress.missionStarted ? "Continue Mission" : "Start Mission"}
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Current Mission</p>
              <h2 className="mt-2 text-2xl font-black text-ink">
                {progress.finalIdentity ?? (nextLevel ? nextLevel.title : "Your premiere awaits")}
              </h2>
            </div>
            <Clapperboard className="text-ember" size={28} />
          </div>
          <div className="mt-5">
            <ProgressReel completed={completedIds} />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/50">
            {isMissionComplete(progress)
              ? "Mission complete. Your movie picks and the mini-game are unlocked."
              : `${completedIds.length}/${levels.length} rooms completed.`}
          </p>
          <div className="mt-5">
            <ButtonLink href={isMissionComplete(progress) ? "/movies" : "/mission"} icon={ArrowRight}>
              {isMissionComplete(progress) ? "See Movies" : "Continue"}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between rounded-md border border-ink/10 bg-paper/50 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Status</p>
            <p className="mt-2 text-2xl font-black text-ink">{loyalty.level}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-5xl font-black text-ink">{progress.points}</span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember">
              <Star className="text-paper" fill="currentColor" size={18} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <button
          className="group w-full rounded-md border border-ink/10 bg-ink p-5 text-left shadow-soft transition hover:border-ember/40"
          onClick={() => setGameOpen(true)}
          type="button"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-paper/50">Mini-game</p>
              <h2 className="mt-2 text-2xl font-black text-paper">Film Run.</h2>
              <p className="mt-1.5 text-sm leading-6 text-paper/60">
                Dodge obstacles, collect reels, grind for a better score.
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ember/90 transition group-hover:bg-ember">
              <Play className="translate-x-0.5 text-paper" fill="currentColor" size={22} />
            </div>
          </div>
          {progress.miniGame.highScore > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1.5">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-paper/50">Best</span>
              <span className="text-sm font-black text-paper">{progress.miniGame.highScore}</span>
            </div>
          )}
        </button>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <JourneyCard
          body="Your QR ticket, visit time, address, and mission launch point live together."
          href={progress.ticket ? "/ticket/confirmation" : "/ticket"}
          icon={Ticket}
          title="Ticket"
        />
        <JourneyCard
          body="Twelve missions move you through the museum one short interaction at a time."
          href="/mission"
          icon={Map}
          title="Mission"
        />
        <JourneyCard
          body="Credits, badges, movie saves, and discounts stay available after the visit."
          href="/rewards"
          icon={Gift}
          title="Rewards"
        />
      </section>

      {gameOpen && <FilmRunOverlay onClose={() => setGameOpen(false)} />}
    </div>
  );
}

function JourneyCard({
  body,
  href,
  icon: Icon,
  title,
}: {
  body: string;
  href: string;
  icon: typeof Ticket;
  title: string;
}) {
  return (
    <a className="rounded-md border border-ink/10 bg-paper/75 p-5 shadow-soft transition hover:-translate-y-0.5" href={href}>
      <Icon aria-hidden="true" className="text-ember" size={24} />
      <h2 className="mt-4 text-xl font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/60">{body}</p>
    </a>
  );
}
