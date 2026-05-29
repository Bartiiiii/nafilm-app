"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BadgeCheck, ChevronDown, Gift, LockKeyhole, MapPin, Pencil, RotateCcw, Star, Ticket, UserRound } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { ProgressReel } from "@/components/ProgressReel";
import { SectionHeader } from "@/components/SectionHeader";
import { catalogMovies } from "@/data/catalogMovies";
import { rewards } from "@/data/rewards";
import { visitInfo } from "@/data/tickets";
import { canRedeem, getLoyaltyStatus, getMovie } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

export default function ProfilePage() {
  const progress = useAppState();
  const loyalty = getLoyaltyStatus(progress);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setDraft(progress.userName);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  function commitEdit() {
    progress.actions.setUserName(draft);
    setEditing(false);
  }

  const savedMovies = progress.savedMovies.flatMap((id) => {
    const rec = getMovie(id);
    if (rec) return [{ id: rec.id, title: rec.title, href: `/movies/${rec.id}` }];
    const cat = catalogMovies.find((m) => m.id === id);
    if (cat) return [{ id: cat.id, title: cat.title, href: `/movies` }];
    return [];
  });

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Profile" title="Guest progress." />

      {/* Name card */}
      <section className="flex items-center gap-5 rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink">
          <UserRound className="text-paper" size={32} />
        </div>
        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              autoFocus
              className="w-full border-b-2 border-ember bg-transparent text-2xl font-black text-ink outline-none"
              onBlur={commitEdit}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(false); }}
              ref={inputRef}
              value={draft}
            />
          ) : (
            <p className="text-2xl font-black text-ink">{progress.userName}</p>
          )}
        </div>
        <button
          aria-label="Edit name"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-frame transition hover:bg-ink/10"
          onClick={startEdit}
          type="button"
        >
          <Pencil size={14} />
        </button>
      </section>

      {/* Rewards — collapsible */}
      <section className="rounded-md border border-ink/10 bg-paper/100 shadow-soft">
        {/* Status bar — always visible */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ember">
              <Star className="text-paper" fill="currentColor" size={16} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Status</p>
              <p className="text-base font-black text-ink">{loyalty.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-ink">{progress.points}</span>
            <button
              aria-label={rewardsOpen ? "Collapse rewards" : "Expand rewards"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-frame transition hover:bg-ink/10"
              onClick={() => setRewardsOpen((o) => !o)}
              type="button"
            >
              <ChevronDown
                className={`text-ink transition-transform duration-200 ${rewardsOpen ? "rotate-180" : ""}`}
                size={16}
              />
            </button>
          </div>
        </div>

        {/* Rewards list — collapsible */}
        {rewardsOpen && (
          <div className="border-t border-ink/10 px-4 pb-4 pt-3">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-ink/40">Available rewards</p>
            <div className="space-y-2">
              {rewards.map((reward) => {
                const redeemed = progress.redeemedRewards.includes(reward.id);
                const redeemable = canRedeem(progress, reward);
                return (
                  <div
                    className={`flex items-center justify-between rounded-md border px-4 py-3 ${
                      redeemed
                        ? "border-teal/40 bg-teal/10"
                        : redeemable
                          ? "border-gold/50 bg-gold/10"
                          : "border-ink/10 bg-frame"
                    }`}
                    key={reward.id}
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="truncate text-sm font-black text-ink">{reward.title}</p>
                      <p className="text-xs text-ink/50">{reward.cost} credits</p>
                    </div>
                    {redeemed ? (
                      <BadgeCheck className="shrink-0 text-teal" size={20} />
                    ) : redeemable ? (
                      <button
                        className="shrink-0 rounded-md bg-ink px-3 py-1.5 text-xs font-black text-paper transition hover:bg-ember"
                        onClick={() => progress.actions.redeemReward(reward.id, reward.cost)}
                        type="button"
                      >
                        Redeem
                      </button>
                    ) : (
                      <LockKeyhole className="shrink-0 text-ink/30" size={18} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Ticket + Mission */}
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

      {/* Saved movies */}
      <section>
        <ListPanel title="Saved movies">
          {savedMovies.length ? (
            savedMovies.map((movie) => (
              <Link className="rounded-md bg-frame px-3 py-2 text-sm font-bold text-ink" href={movie.href} key={movie.id}>
                {movie.title}
              </Link>
            ))
          ) : (
            <p className="text-sm leading-6 text-ink/60">Nothing saved yet.</p>
          )}
        </ListPanel>
      </section>

      {/* Museum info */}
      <section className="rounded-md border border-ink/10 bg-paper/75 p-5">
        <div className="flex items-center gap-2">
          <MapPin className="text-ember" size={20} />
          <h2 className="text-lg font-black text-ink">Museum info</h2>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <InfoRow label="Address" value={visitInfo.address} />
          <InfoRow label="Hours" value={visitInfo.openingHours} />
          <InfoRow label="Language" value={visitInfo.languages} />
        </dl>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-black text-ink/50">{label}</dt>
      <dd className="mt-1 whitespace-pre-line font-semibold leading-5 text-ink">{value}</dd>
    </div>
  );
}
