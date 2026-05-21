"use client";

import { ArrowRight, Clapperboard, Gift, Map, Star, Ticket } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressReel } from "@/components/ProgressReel";
import { levels } from "@/data/levels";
import { getLoyaltyStatus, getNextLevel, isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function HomePage() {
  const progress = useAppState();
  const completedIds = progress.completedLevels.map((level) => level.levelId);
  const nextLevel = getNextLevel(progress);
  const loyalty = getLoyaltyStatus(progress);

  return (
    <div className="content-wrap space-y-7">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <div className="rounded-md bg-ink p-6 text-paper shadow-soft sm:p-8">
          <div className="mb-4">
            <img
              alt="NaFilM Action"
              className="h-auto w-[5.5rem] sm:w-28"
              height={1488}
              src="/new-logo-action-white.png"
              width={2000}
            />
          </div>
          <p className="max-w-2xl text-base leading-7 text-paper/70">
            Enhance your museum experience by finishing missions, collecting points, exchanging them
            for rewards, and enjoying movie recommendations made for you!
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={progress.ticket ? "/ticket/confirmation" : "/ticket"} icon={Ticket} variant="secondary">
              {progress.ticket ? "View Ticket" : "Buy Ticket"}
            </ButtonLink>
            <ButtonLink href="/mission" icon={Map} variant="secondary">
              {progress.missionStarted ? "Continue Mission" : "Start Mission"}
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Now playing</p>
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
              : `${completedIds.length}/${levels.length} rooms completed. ${loyalty.next}.`}
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

      <section className="grid gap-4 lg:grid-cols-3">
        <JourneyCard
          body="Your QR ticket, visit time, address, and mission launch point live together."
          href={progress.ticket ? "/ticket/confirmation" : "/ticket"}
          icon={Ticket}
          title="Ticket"
        />
        <JourneyCard
          body="Six physical-first missions move you through the museum one short interaction at a time."
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
