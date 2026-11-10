"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";

/**
 * Modal sobre <dialog> nativo: foco preso, Esc e devolução de foco vêm do
 * navegador. Todo fechamento passa pelo close(), que dispara onClose.
 */
export function Modal({
  label,
  onClose,
  onKeyDown,
  className = "",
  children,
}: {
  label: string;
  onClose: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
  className?: string;
  children: (close: () => void) => ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      className={`modal fixed inset-0 m-auto size-full max-h-none max-w-none bg-transparent ${className}`}
    >
      <motion.div
        className="size-full"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {children(close)}
      </motion.div>
    </dialog>
  );
}

export const modalControlStyles =
  "flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30";
