"use client";

import { BadgeCheck, Gift, LockKeyhole, Star, User } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { SectionHeader } from "@/components/SectionHeader";
import { rewards } from "@/data/rewards";
import { canRedeem, getLoyaltyStatus } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

const nextRankMap: Record<string, string> = {
  Guest: "Visitor",
  Visitor: "Trainee",
  Trainee: "Crew Member",
  "Crew Member": "Specialist",
  Specialist: "Auteur",
  Auteur: "Cinephile",
  Cinephile: "Top rank reached",
};

export default function RewardsPage() {
  const progress = useAppState();
  const loyalty = getLoyaltyStatus(progress);
  const loyaltyPercent = loyalty.target ? Math.min(100, Math.round((loyalty.current / loyalty.target) * 100)) : 0;
  const nextRank = nextRankMap[loyalty.level] ?? "Top rank reached";

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Rewards" title="Film Credits and perks." />

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

      <section className="rounded-md bg-ink p-5 text-paper shadow-soft">
        <div className="flex items-center gap-3">
          <User className="text-gold" size={26} />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-paper/50">Next Rank</p>
            <h2 className="text-2xl font-black">{nextRank}</h2>
          </div>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-paper/20">
          <div className="h-full rounded-full bg-gold" style={{ width: `${loyaltyPercent}%` }} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black text-ink">Available rewards</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {rewards.map((reward) => {
            const redeemed = progress.redeemedRewards.includes(reward.id);
            const redeemable = canRedeem(progress, reward);
            const locked = !redeemable && !redeemed;

            return (
              <article
                className={`rounded-md border p-5 shadow-soft ${
                  redeemed
                    ? "border-teal/60 bg-teal/10"
                    : redeemable
                      ? "border-gold/50 bg-gold/20"
                      : "border-ink/10 bg-paper/50"
                }`}
                key={reward.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50">{reward.type}</p>
                    <h3 className="mt-1 text-xl font-black text-ink">{reward.title}</h3>
                  </div>
                  {redeemed ? <BadgeCheck className="text-teal" size={24} /> : locked ? <LockKeyhole size={22} /> : <Gift className="text-gold" size={24} />}
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/60">{reward.description}</p>
                <p className="mt-4 text-2xl font-black text-ink">{reward.cost}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">Film Credits</p>
                <ActionButton
                  className="mt-5 w-full"
                  disabled={!redeemable}
                  icon={redeemed ? BadgeCheck : Gift}
                  onClick={() => progress.actions.redeemReward(reward.id, reward.cost)}
                  variant={redeemable ? "primary" : "secondary"}
                >
                  {redeemed ? "Redeemed" : reward.active ? "Redeem" : "Coming Soon"}
                </ActionButton>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
