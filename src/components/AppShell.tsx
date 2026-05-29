"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Home, Map, ShoppingBag, UserCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ticket", label: "Eshop", icon: ShoppingBag },
  { href: "/mission", label: "Mission", icon: Map },
  { href: "/movies", label: "Movies", icon: Clapperboard },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <main className="page-shell">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/95 px-2 py-2 shadow-soft backdrop-blur-xl">
        <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                aria-label={item.label}
                className={`focus-ring flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-semibold transition ${
                  isActive ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                }`}
                href={item.href}
                key={item.href}
                title={item.label}
              >
                <Icon aria-hidden="true" size={19} strokeWidth={2.2} />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
