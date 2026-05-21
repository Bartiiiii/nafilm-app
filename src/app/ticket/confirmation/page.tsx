"use client";

import { useRouter } from "next/navigation";
import { Gift, Map, WalletCards } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { TicketQr } from "@/components/TicketQr";
import { visitInfo } from "@/data/tickets";
import { useAppState } from "@/lib/useAppState";

export default function TicketConfirmationPage() {
  const router = useRouter();
  const progress = useAppState();
  const ticket = progress.ticket;

  if (!ticket) {
    return (
      <div className="content-wrap">
        <EmptyState
          action="Create Ticket"
          body="Create a mock ticket first, then the digital QR and visit details will appear here."
          href="/ticket"
          title="No ticket yet"
        />
      </div>
    );
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Digital ticket" title="Your NaFilM ticket is ready." />

      <section className="grid gap-5 lg:grid-cols-[0.75fr_1fr]">
        <TicketQr ticket={ticket} />

        <div className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <TicketDetail label="Ticket" value={ticket.typeLabel} />
            <TicketDetail label="Visit" value={`${ticket.visitDate} at ${ticket.visitTime}`} />
            <TicketDetail label="Address" value={visitInfo.address} />
            <TicketDetail label="Hours" value={visitInfo.openingHours} />
            <TicketDetail label="Language" value={visitInfo.languages} />
            <TicketDetail label="Ticket ID" value={ticket.id} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ActionButton
              icon={Map}
              onClick={() => {
                progress.actions.startMission();
                router.push("/mission");
              }}
            >
              Start Mission
            </ActionButton>
            <ButtonLink href="/rewards" icon={Gift} variant="secondary">
              Rewards
            </ButtonLink>
            <ActionButton disabled icon={WalletCards} variant="secondary">
              Wallet Soon
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function TicketDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-frame p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50">{label}</p>
      <p className="mt-2 text-sm font-bold leading-5 text-ink">{value}</p>
    </div>
  );
}
