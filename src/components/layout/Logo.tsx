export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="86 0 1659 806" fill="#E11D2A" aria-hidden="true" className={className}>
      <path d="M86 321 902 1v75L243 328v282h242v64H86z" />
      <path d="M533 240 903 96v64l-236 93v149h236v68H667v140h236v64H533z" />
      <path d="M936 96l181 74v440h206v64H936z" />
      <path d="M936 2l808 328v76l-184-76v344h-185V253L936 76z" />
      <path d="M86 695h1473v47H86zM86 758h1473v47H86z" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col font-display leading-none">
        <span className="text-[15px] font-extrabold uppercase tracking-[0.12em] text-slate-900">
          El Tayar
        </span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600">
          Empreendimentos
        </span>
      </span>
    </span>
  );
}
