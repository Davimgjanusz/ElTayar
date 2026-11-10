import type { ReactNode } from "react";

/** Rótulo de seção com as duas barras da base do logotipo. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
      <span aria-hidden="true" className="flex w-7 flex-col gap-[3px]">
        <span className="h-[3px] bg-el-red-600" />
        <span className="h-[3px] bg-el-red-600" />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-bold leading-[1.12] sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-base leading-relaxed sm:text-lg">{children}</p> : null}
    </div>
  );
}
