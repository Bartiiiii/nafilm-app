"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CreditCard, Ticket } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { ticketTypes, visitInfo, visitTimes } from "@/data/tickets";
import { useAppState } from "@/lib/useAppState";

export default function TicketPage() {
  const router = useRouter();
  const progress = useAppState();
  const [typeId, setTypeId] = useState(ticketTypes[0].id);
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [visitTime, setVisitTime] = useState(visitTimes[2]);
  const selectedType = ticketTypes.find((type) => type.id === typeId) ?? ticketTypes[0];

  const canSubmit = useMemo(() => Boolean(typeId && visitDate && visitTime), [typeId, visitDate, visitTime]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    progress.actions.createTicket(typeId, visitDate, visitTime);
    router.push("/ticket/confirmation");
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Ticket" title="Choose your visit." />

      <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <form className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft sm:p-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <fieldset>
              <legend className="text-sm font-black text-ink">Ticket type</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {ticketTypes.map((type) => (
                  <label
                    className={`cursor-pointer rounded-md border p-4 transition ${
                      typeId === type.id ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper hover:bg-frame"
                    }`}
                    key={type.id}
                  >
                    <input
                      checked={typeId === type.id}
                      className="sr-only"
                      name="ticketType"
                      onChange={() => setTypeId(type.id)}
                      type="radio"
                    />
                    <span className="block text-base font-black">{type.label}</span>
                    <span className={`mt-1 block text-sm ${typeId === type.id ? "text-paper/50" : "text-ink/60"}`}>
                      {type.price}
                    </span>
                    <span className={`mt-3 block text-xs font-bold ${typeId === type.id ? "text-gold" : "text-teal"}`}>
                      +{type.points} credits
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-ink">Visit date</span>
                <input
                  className="focus-ring mt-2 min-h-12 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm font-semibold text-ink"
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(event) => setVisitDate(event.target.value)}
                  type="date"
                  value={visitDate}
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-ink">Visit time</span>
                <select
                  className="focus-ring mt-2 min-h-12 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm font-semibold text-ink"
                  onChange={(event) => setVisitTime(event.target.value)}
                  value={visitTime}
                >
                  {visitTimes.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="rounded-md bg-frame p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="text-teal" size={20} />
                <p className="text-sm font-bold text-ink">Mock checkout</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                No payment is taken in this prototype. The confirmation creates a digital ticket and credits.
              </p>
            </div>

            <ActionButton className="w-full" disabled={!canSubmit} icon={Ticket} type="submit">
              Create Ticket
            </ActionButton>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="rounded-md bg-ink p-5 text-paper shadow-soft">
            <CalendarDays className="text-gold" size={24} />
            <h2 className="mt-4 text-2xl font-black">{selectedType.label} Ticket</h2>
            <p className="mt-1 text-paper/50">{selectedType.price}</p>
            <p className="mt-4 text-sm leading-6 text-paper/50">
              {visitDate} at {visitTime}. Earn {selectedType.points} Film Credits at checkout.
            </p>
          </div>

          <div className="rounded-md border border-ink/10 bg-paper/75 p-5">
            <h2 className="text-lg font-black text-ink">Visit info</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <InfoRow label="Address" value={visitInfo.address} />
              <InfoRow label="Hours" value={visitInfo.openingHours} />
              <InfoRow label="Language" value={visitInfo.languages} />
            </dl>
            {progress.ticket ? (
              <div className="mt-5">
                <ButtonLink href="/ticket/confirmation" variant="secondary">
                  Current Ticket
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-black text-ink/50">{label}</dt>
      <dd className="mt-1 font-semibold leading-5 text-ink">{value}</dd>
    </div>
  );
}
