"use client";

import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "quiet" | "danger";
};

const variants = {
  primary: "bg-ink text-paper hover:bg-ink/90 disabled:bg-ink/30",
  secondary: "bg-paper text-ink ring-1 ring-ink/10 hover:bg-frame disabled:text-ink/40",
  quiet: "bg-transparent text-ink hover:bg-ink/5 disabled:text-ink/40",
  danger: "bg-ember text-paper hover:bg-ember/90 disabled:bg-ember/40",
};

export function ActionButton({
  children,
  className = "",
  icon: Icon,
  variant = "primary",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </button>
  );
}
