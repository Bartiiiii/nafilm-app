"use client";

import Link from "next/link";
import { RotateCcw, Ticket, UserRound } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressReel } from "@/components/ProgressReel";
import { SectionHeader } from "@/components/SectionHeader";
import { getLoyaltyStatus, getMovie, getReward } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function ProfilePage() {
  const progress = useAppState();
  const loyalty = getLoyaltyStatus(progress);
  const savedMovies = progress.savedMovies.flatMap((id) => {
    const movie = getMovie(id);
    return movie ? [movie] : [];
  });
  const redeemedRewards = progress.redeemedRewards.flatMap((id) => {
    const reward = getReward(id);
    return reward ? [reward] : [];
  });

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Profile" title="Guest progress." />

      <section className="flex items-center gap-5 rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink">
          <UserRound className="text-paper" size={32} />
        </div>
        <div>
          <p className="text-2xl font-black text-ink">Guest</p>
          <p className="mt-1 text-sm font-semibold text-ink/50">{loyalty.level}</p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
          <h2 className="text-2xl font-black text-ink">Ticket</h2>
          {progress.ticket ? (
            <div className="mt-4 space-y-3 text-sm font-semibold text-ink/50">
              <p>{progress.ticket.typeLabel}</p>
              <p>Valid for {progress.ticket.validity}</p>
              <p className="break-all">{progress.ticket.id}</p>
              <ButtonLink href="/ticket/confirmation" icon={Ticket} variant="secondary">
                Open Ticket
              </ButtonLink>
            </div>
          ) : (
            <div className="mt-4">
              <p className="mb-4 text-sm leading-6 text-ink/60">No ticket in this guest profile yet.</p>
              <ButtonLink href="/ticket" icon={Ticket}>
                Create Ticket
              </ButtonLink>
            </div>
          )}
        </div>

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
          <h2 className="text-2xl font-black text-ink">Mission progress</h2>
          <div className="mt-4">
            <ProgressReel completed={progress.completedLevels.map((level) => level.levelId)} />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/60">
            {progress.finalIdentity ? `Final identity: ${progress.finalIdentity}` : "Final identity appears after all rooms."}
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ListPanel title="Saved movies">
          {savedMovies.length ? (
            savedMovies.map((movie) => (
              <Link className="rounded-md bg-frame px-3 py-2 text-sm font-bold text-ink" href={`/movies/${movie.id}`} key={movie.id}>
                {movie.title}
              </Link>
            ))
          ) : (
            <p className="text-sm leading-6 text-ink/60">Nothing saved yet.</p>
          )}
        </ListPanel>

        <ListPanel title="Redeemed rewards">
          {redeemedRewards.length ? (
            redeemedRewards.map((reward) => (
              <span className="rounded-md bg-frame px-3 py-2 text-sm font-bold text-ink" key={reward.id}>
                {reward.title}
              </span>
            ))
          ) : (
            <p className="text-sm leading-6 text-ink/60">Rewards you redeem will appear here.</p>
          )}
        </ListPanel>
      </section>

      <section>
        <ActionButton icon={RotateCcw} onClick={progress.actions.resetPrototype} variant="secondary">
          Reset prototype
        </ActionButton>
      </section>
    </div>
  );
}

function ListPanel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper/75 p-5">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
