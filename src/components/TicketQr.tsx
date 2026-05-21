import type { Ticket } from "@/types";

export function TicketQr({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-md bg-paper p-4 ring-1 ring-ink/10">
      <div className="qr-grid mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-sm">
        <div className="m-4 h-12 w-12 bg-paper p-2">
          <div className="h-full w-full bg-ink" />
        </div>
      </div>
      <p className="mt-3 break-all text-center text-xs font-black tracking-[0.16em] text-ink/50">{ticket.id}</p>
    </div>
  );
}
