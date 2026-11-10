import type { ReactNode } from "react";

/** Selo de status. Usa el-red-700 sobre el-red-50 para atingir o contraste AA. */
export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-el-red-50 px-2.5 py-1 text-xs font-semibold text-el-red-700">
      {children}
    </span>
  );
}

/** Caixa compacta para dados numéricos: área, quartos e vagas. */
export function SpecBadge({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-stone-200 bg-white px-2 py-1 text-xs font-semibold tabular-nums text-slate-900">
      <span aria-hidden="true" className="text-slate-600">
        {icon}
      </span>
      {children}
    </span>
  );
}
