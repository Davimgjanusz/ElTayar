type ButtonVariant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-el-red-600 text-white hover:bg-el-red-700 active:bg-el-red-700",
  outline: "border border-stone-200 bg-white text-slate-900 hover:border-slate-900",
};

export function buttonStyles(variant: ButtonVariant = "primary", className = ""): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}
