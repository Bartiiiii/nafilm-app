"use client";

import { useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { SectionHeader } from "@/components/SectionHeader";
import { ticketTypes } from "@/data/tickets";
import { useAppState } from "@/lib/useAppState";

type CartItem = {
  id: string;
  label: string;
  priceNum: number;
  qty: number;
  kind: "ticket" | "product";
  points?: number;
};

type Step = "shop" | "cart" | "checkout" | "confirmed";

const shopProducts = [
  { id: "tote", name: "Cinema Tote Bag", priceNum: 190, tag: "Bestseller", emoji: "🛍️" },
  { id: "book", name: "Film History Book", priceNum: 350, tag: "New", emoji: "📖" },
  { id: "socks", name: "Cinema Socks", priceNum: 99, tag: null, emoji: "🧦" },
  { id: "poster", name: "Vintage Poster Print", priceNum: 149, tag: null, emoji: "🖼️" },
  { id: "notebook", name: "Director's Notebook", priceNum: 220, tag: "Limited", emoji: "📓" },
  { id: "pins", name: "Enamel Pin Set", priceNum: 120, tag: null, emoji: "📌" },
];

export default function TicketPage() {
  const progress = useAppState();
  const [step, setStep] = useState<Step>("shop");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  function getQty(id: string) {
    return cart.find((i) => i.id === id)?.qty ?? 0;
  }

  function setQty(id: string, qty: number, makeItem: () => Omit<CartItem, "qty">) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => {
        const exists = prev.find((i) => i.id === id);
        if (exists) return prev.map((i) => (i.id === id ? { ...i, qty } : i));
        return [...prev, { ...makeItem(), qty }];
      });
    }
  }

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    cart.filter((i) => i.kind === "ticket").forEach((item) => {
      progress.actions.createTicket(item.id);
    });
    setStep("confirmed");
  }

  // ── Confirmed ──────────────────────────────────────────────────────────────
  if (step === "confirmed") {
    return (
      <div className="content-wrap space-y-7">
        <SectionHeader eyebrow="Eshop" title="Order placed." />
        <div className="rounded-md border border-teal/40 bg-teal/10 p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto text-teal" size={48} />
          <h2 className="mt-4 text-2xl font-black text-ink">You're all set!</h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            Confirmation sent to <span className="font-bold text-ink">{form.email}</span>. Your ticket is in the Profile tab.
          </p>
          <div className="mt-6 space-y-2 text-left">
            {cart.map((item) => (
              <div className="flex justify-between text-sm font-semibold text-ink" key={item.id}>
                <span>{item.label} × {item.qty}</span>
                <span>{item.priceNum * item.qty} CZK</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base font-black text-ink">
              <span>Total</span>
              <span>{totalPrice} CZK</span>
            </div>
          </div>
          <button
            className="mt-8 text-sm font-black text-ember underline"
            onClick={() => { setCart([]); setStep("shop"); }}
            type="button"
          >
            Back to Eshop
          </button>
        </div>
      </div>
    );
  }

  // ── Checkout ───────────────────────────────────────────────────────────────
  if (step === "checkout") {
    return (
      <div className="content-wrap space-y-7">
        <SectionHeader eyebrow="Eshop" title="Checkout." />
        <form className="space-y-5" onSubmit={handleCheckout}>
          <div className="space-y-4 rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
            <h2 className="text-lg font-black text-ink">Your details</h2>
            <FormField label="Full name" required>
              <input
                className="w-full rounded-md border border-ink/10 bg-frame px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-ink"
                placeholder="Jan Novák"
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </FormField>
            <FormField label="Email" required>
              <input
                className="w-full rounded-md border border-ink/10 bg-frame px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-ink"
                placeholder="jan@example.com"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </FormField>
            {cart.some((i) => i.kind === "ticket") && (
              <FormField label="Planned visit date">
                <input
                  className="w-full rounded-md border border-ink/10 bg-frame px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-ink"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                />
              </FormField>
            )}
          </div>

          <div className="space-y-3 rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
            <h2 className="text-lg font-black text-ink">Order summary</h2>
            {cart.map((item) => (
              <div className="flex justify-between text-sm font-semibold text-ink" key={item.id}>
                <span>{item.label} × {item.qty}</span>
                <span>{item.priceNum * item.qty} CZK</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-black text-ink">
              <span>Total</span>
              <span>{totalPrice} CZK</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 rounded-md border border-ink/10 py-3 text-sm font-black text-ink transition hover:bg-frame"
              onClick={() => setStep("cart")}
              type="button"
            >
              ← Back
            </button>
            <ActionButton className="flex-1" icon={CheckCircle2} type="submit">
              Place Order
            </ActionButton>
          </div>
        </form>
      </div>
    );
  }

  // ── Cart ───────────────────────────────────────────────────────────────────
  if (step === "cart") {
    return (
      <div className="content-wrap space-y-7">
        <SectionHeader eyebrow="Eshop" title="Your cart." />
        <div className="space-y-3">
          {cart.length === 0 && (
            <p className="text-sm leading-6 text-ink/60">Your cart is empty.</p>
          )}
          {cart.map((item) => (
            <div className="flex items-center gap-3 rounded-md border border-ink/10 bg-paper/100 p-4 shadow-soft" key={item.id}>
              <div className="flex-1 min-w-0">
                <p className="font-black text-ink truncate">{item.label}</p>
                <p className="text-xs text-ink/50">{item.priceNum} CZK each</p>
                {item.points && (
                  <p className="text-xs font-bold text-teal">+{item.points * item.qty} credits</p>
                )}
              </div>
              <div className="flex items-center gap-1 rounded-md border border-ink/10 px-2 py-1.5">
                <button
                  className="flex h-5 w-5 items-center justify-center text-ink/50 hover:text-ink"
                  onClick={() => {
                    const type = ticketTypes.find((t) => t.id === item.id);
                    const product = shopProducts.find((p) => p.id === item.id);
                    if (type) setQty(item.id, item.qty - 1, () => ({ id: item.id, label: item.label, priceNum: item.priceNum, kind: "ticket", points: item.points }));
                    else if (product) setQty(item.id, item.qty - 1, () => ({ id: item.id, label: item.label, priceNum: item.priceNum, kind: "product" }));
                  }}
                  type="button"
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-sm font-black text-ink">{item.qty}</span>
                <button
                  className="flex h-5 w-5 items-center justify-center text-ink/50 hover:text-ink"
                  onClick={() => {
                    const type = ticketTypes.find((t) => t.id === item.id);
                    const product = shopProducts.find((p) => p.id === item.id);
                    if (type) setQty(item.id, item.qty + 1, () => ({ id: item.id, label: item.label, priceNum: item.priceNum, kind: "ticket", points: item.points }));
                    else if (product) setQty(item.id, item.qty + 1, () => ({ id: item.id, label: item.label, priceNum: item.priceNum, kind: "product" }));
                  }}
                  type="button"
                >
                  <Plus size={12} />
                </button>
              </div>
              <button
                aria-label="Remove item"
                className="text-ink/30 transition hover:text-ember"
                onClick={() => setCart((prev) => prev.filter((i) => i.id !== item.id))}
                type="button"
              >
                <Trash2 size={17} />
              </button>
              <div className="w-20 shrink-0 text-right text-sm font-black text-ink">
                {item.priceNum * item.qty} CZK
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="rounded-md border border-ink/10 bg-paper/50 p-4">
            <div className="flex justify-between text-xl font-black text-ink">
              <span>Total</span>
              <span>{totalPrice} CZK</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            className="flex-1 rounded-md border border-ink/10 py-3 text-sm font-black text-ink transition hover:bg-frame"
            onClick={() => setStep("shop")}
            type="button"
          >
            ← Keep shopping
          </button>
          {cart.length > 0 && (
            <ActionButton className="flex-1" icon={ShoppingCart} onClick={() => setStep("checkout")}>
              Checkout
            </ActionButton>
          )}
        </div>
      </div>
    );
  }

  // ── Shop ───────────────────────────────────────────────────────────────────
  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Eshop" title="Tickets & merch." />

      {totalItems > 0 && (
        <button
          className="sticky top-2 z-40 flex w-full items-center justify-between rounded-md bg-ink px-5 py-3 text-paper shadow-soft transition hover:bg-ink/90"
          onClick={() => setStep("cart")}
          type="button"
        >
          <span className="flex items-center gap-2 text-sm font-black">
            <ShoppingCart size={16} />
            {totalItems} item{totalItems !== 1 ? "s" : ""} · {totalPrice} CZK
          </span>
          <span className="flex items-center gap-1.5 text-sm font-black text-ember">
            Proceed to checkout
            <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
      )}

      {/* Admission tickets — each type has its own cart button / stepper */}
      <section className="rounded-md border border-ink/10 bg-paper/100 p-5 shadow-soft">
        <p className="text-sm font-black text-ink">Admission tickets</p>
        <div className="mt-3 flex flex-col gap-2">
          {ticketTypes.map((type) => {
            const qty = getQty(type.id);
            const makeTicket = () => ({
              id: type.id,
              label: `${type.label} Ticket`,
              priceNum: parseInt(type.price),
              kind: "ticket" as const,
              points: type.points,
            });
            return (
              <div
                className="flex items-center justify-between rounded-md border border-ink/10 bg-paper px-4 py-3"
                key={type.id}
              >
                <div className="flex-1 min-w-0">
                  <span className="block font-black text-ink">{type.label}</span>
                  <span className="text-xs font-bold text-teal">+{type.points} credits</span>
                </div>
                <span className="mr-4 text-sm font-semibold text-ink/60">{type.price}</span>

                {qty === 0 ? (
                  /* Black cart button — initial state */
                  <button
                    aria-label={`Add ${type.label} ticket to cart`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink text-paper transition hover:bg-ember"
                    onClick={() => setQty(type.id, 1, makeTicket)}
                    type="button"
                  >
                    <ShoppingCart size={16} />
                  </button>
                ) : (
                  /* Inline stepper — appears after first tap */
                  <div className="flex items-center gap-1 rounded-md border border-ink bg-ink px-2 py-1.5">
                    <button
                      className="flex h-5 w-5 items-center justify-center text-paper/60 hover:text-paper"
                      onClick={() => setQty(type.id, qty - 1, makeTicket)}
                      type="button"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-black text-paper">{qty}</span>
                    <button
                      className="flex h-5 w-5 items-center justify-center text-paper/60 hover:text-paper"
                      onClick={() => setQty(type.id, qty + 1, makeTicket)}
                      type="button"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Museum store — green cart icon, stepper from 1 on tap */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <ShoppingBag className="text-ember" size={20} />
          <h2 className="text-lg font-black text-ink">Museum Store</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {shopProducts.map((product) => {
            const qty = getQty(product.id);
            const makeProduct = () => ({
              id: product.id,
              label: product.name,
              priceNum: product.priceNum,
              kind: "product" as const,
            });
            return (
              <div
                className="relative rounded-md border border-ink/10 bg-paper/100 p-4 shadow-soft transition hover:-translate-y-0.5"
                key={product.id}
              >
                {product.tag && (
                  <span className="absolute right-3 top-3 rounded-full bg-ember px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-paper">
                    {product.tag}
                  </span>
                )}
                <div className="flex h-16 items-center justify-center rounded-md bg-frame text-3xl">
                  {product.emoji}
                </div>
                <h3 className="mt-3 text-sm font-black leading-5 text-ink">{product.name}</h3>
                <p className="mt-0.5 text-xs text-ink/50">{product.priceNum} CZK</p>

                <div className="mt-3">
                  {qty === 0 ? (
                    /* Green cart button — initial state */
                    <button
                      aria-label={`Add ${product.name} to cart`}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-teal py-2 text-xs font-black text-paper transition hover:bg-teal/80"
                      onClick={() => setQty(product.id, 1, makeProduct)}
                      type="button"
                    >
                      <ShoppingCart size={13} />
                      Add to cart
                    </button>
                  ) : (
                    /* Stepper — appears after first tap, starts at 1 */
                    <div className="flex items-center justify-between rounded-md border border-teal bg-teal/10 px-3 py-1.5">
                      <button
                        className="flex h-6 w-6 items-center justify-center text-teal hover:text-ink"
                        onClick={() => setQty(product.id, qty - 1, makeProduct)}
                        type="button"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-black text-ink">{qty}</span>
                      <button
                        className="flex h-6 w-6 items-center justify-center text-teal hover:text-ink"
                        onClick={() => setQty(product.id, qty + 1, makeProduct)}
                        type="button"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-black text-ink">
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
