import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "quiet" | "gold";
};

const variants = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  secondary: "bg-paper text-ink ring-1 ring-ink/10 hover:bg-frame",
  quiet: "bg-transparent text-ink hover:bg-ink/5",
  gold: "bg-[#ecb500] text-white hover:bg-[#d4a300]",
};

export function ButtonLink({ href, children, icon: Icon, variant = "primary" }: ButtonLinkProps) {
  return (
    <Link
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition ${variants[variant]}`}
      href={href}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </Link>
  );
}
