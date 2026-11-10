import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/whatsapp-link";

export function WhatsAppButton() {
  return (
    <WhatsAppLink
      placement="botao-flutuante"
      ariaLabel="Conversar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-el-red-600 text-white shadow-lg shadow-slate-900/25 transition-colors hover:bg-el-red-700"
    >
      <WhatsAppIcon className="size-7" />
    </WhatsAppLink>
  );
}
