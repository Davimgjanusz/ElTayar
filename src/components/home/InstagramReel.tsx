"use client";

import { ExternalLink, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal, modalControlStyles } from "@/components/ui/modal";
import { KALIL_REEL_URL, kalilCover } from "@/data/kalil";

const EMBED_TIMEOUT_MS = 8000;

function ReelEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setTimedOut(true), EMBED_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  return (
    <div className="relative aspect-[9/16] h-full max-h-full max-w-full overflow-hidden rounded-lg bg-white">
      <iframe
        src={`${KALIL_REEL_URL}embed/`}
        title="Vídeo do Edifício Kalil 321 no Instagram"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
        allow="encrypted-media; picture-in-picture"
        onLoad={() => setLoaded(true)}
        className="size-full border-0"
      />
      {timedOut && !loaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white p-6 text-center">
          <p className="text-sm">Não foi possível carregar o vídeo aqui.</p>
          <a
            href={KALIL_REEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-el-red-700 underline underline-offset-2"
          >
            Assistir no Instagram
          </a>
        </div>
      ) : null}
    </div>
  );
}

/**
 * O iframe só existe depois do clique: a página não carrega scripts nem
 * rastreadores do Instagram para quem não pediu para ver o vídeo.
 */
export default function InstagramReel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Reproduzir o vídeo do Edifício Kalil 321"
        className="group relative mx-auto block aspect-[9/16] w-full max-w-xs overflow-hidden rounded-lg bg-slate-100"
      >
        <Image src={kalilCover.src} alt="" fill sizes="320px" className="object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/20 transition-colors group-hover:bg-slate-900/35">
          <span className="flex size-16 items-center justify-center rounded-full bg-el-red-600 text-white transition-colors group-hover:bg-el-red-700">
            <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
          </span>
        </span>
      </button>

      <a
        href={KALIL_REEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-3 flex w-fit items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-el-red-600"
      >
        Abrir no Instagram
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </a>

      {open ? (
        <Modal label="Vídeo do Edifício Kalil 321" onClose={() => setOpen(false)} className="p-4">
          {(close) => (
            <div
              className="relative flex size-full items-center justify-center"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <ReelEmbed />
              <button
                type="button"
                onClick={close}
                aria-label="Fechar vídeo"
                className={`absolute right-0 top-0 ${modalControlStyles}`}
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
}
