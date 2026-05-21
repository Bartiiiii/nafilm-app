import { ButtonLink } from "@/components/ButtonLink";

export function EmptyState({
  title,
  body,
  href,
  action,
  variant = "primary",
}: {
  title: string;
  body: string;
  href: string;
  action: string;
  variant?: "primary" | "secondary" | "gold";
}) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper/75 p-6 text-center shadow-soft">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/50">{body}</p>
      <div className="mt-5">
        <ButtonLink href={href} variant={variant}>{action}</ButtonLink>
      </div>
    </div>
  );
}
