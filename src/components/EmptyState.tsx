import { ButtonLink } from "@/components/ButtonLink";

export function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper/75 p-6 text-center shadow-soft">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/50">{body}</p>
      <div className="mt-5">
        <ButtonLink href={href}>{action}</ButtonLink>
      </div>
    </div>
  );
}
