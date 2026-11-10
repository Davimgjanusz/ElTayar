"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { Modal, modalControlStyles } from "@/components/ui/modal";
import { Tabs, tabId, tabPanelId } from "@/components/ui/tabs";
import { kalilGallery } from "@/data/kalil";
import type { PropertyImage } from "@/types";

const ID_PREFIX = "galeria";
const FALLBACK_CATEGORY = kalilGallery[0]!;

function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: PropertyImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const image = images[index];
  const hasMany = images.length > 1;
  const step = (delta: number) => onIndexChange((index + delta + images.length) % images.length);

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (!hasMany) return;
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  if (!image) return null;

  return (
    <Modal label="Galeria ampliada" onClose={onClose} onKeyDown={handleKeyDown} className="p-4 sm:p-10">
      {(close) => (
        <div className="relative mx-auto flex size-full max-w-5xl flex-col justify-center gap-3">
          <div className="relative max-h-[80svh] w-full flex-1">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
          </div>
          <p className="text-center text-sm text-white/80">
            {image.alt}
            {hasMany ? ` (${index + 1} de ${images.length})` : ""}
          </p>
          <button type="button" onClick={close} aria-label="Fechar galeria" className={`absolute right-0 top-0 ${modalControlStyles}`}>
            <X className="size-5" />
          </button>
          {hasMany ? (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className={`absolute left-0 top-1/2 -translate-y-1/2 ${modalControlStyles}`}>
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className={`absolute right-0 top-1/2 -translate-y-1/2 ${modalControlStyles}`}>
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}
        </div>
      )}
    </Modal>
  );
}

export function KalilGallery() {
  const [activeCategoryId, setActiveCategoryId] = useState(FALLBACK_CATEGORY.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const category = kalilGallery.find((item) => item.id === activeCategoryId) ?? FALLBACK_CATEGORY;
  const image = category.images[imageIndex] ?? category.images[0];

  function selectCategory(id: string) {
    setActiveCategoryId(id);
    setImageIndex(0);
  }

  if (!image) return null;

  return (
    <div>
      <Tabs
        items={kalilGallery.map(({ id, label }) => ({ id, label }))}
        active={category.id}
        onChange={selectCategory}
        idPrefix={ID_PREFIX}
        label="Ambientes do Edifício Kalil 321"
      />

      <div
        id={tabPanelId(ID_PREFIX)}
        role="tabpanel"
        aria-labelledby={tabId(ID_PREFIX, category.id)}
        className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10"
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Ampliar foto: ${image.alt}`}
          className="group relative block aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-100"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={image.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-md bg-white/90 text-slate-900 transition-colors group-hover:bg-white">
            <Expand className="size-4" aria-hidden="true" />
          </span>
        </button>

        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">{category.label}</h3>
          <p className="mt-3 leading-relaxed">{category.description}</p>

          {category.images.length > 1 ? (
            <ul className="mt-6 grid grid-cols-3 gap-2">
              {category.images.map((thumb, index) => (
                <li key={thumb.src}>
                  <button
                    type="button"
                    onClick={() => setImageIndex(index)}
                    aria-label={`Ver foto ${index + 1} de ${category.images.length}: ${thumb.alt}`}
                    aria-current={index === imageIndex}
                    className={`relative block aspect-[4/3] w-full overflow-hidden rounded ring-offset-2 transition ${
                      index === imageIndex ? "ring-2 ring-el-red-600" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image src={thumb.src} alt="" fill sizes="140px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {lightboxOpen ? (
        <Lightbox
          images={category.images}
          index={imageIndex}
          onIndexChange={setImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </div>
  );
}
