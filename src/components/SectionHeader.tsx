export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="space-y-2">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">{eyebrow}</p> : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="max-w-3xl text-3xl font-black leading-[1.02] text-ink sm:text-5xl">{title}</h1>
        {children}
      </div>
    </header>
  );
}
