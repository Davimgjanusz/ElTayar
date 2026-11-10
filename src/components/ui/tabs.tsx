"use client";

import { motion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";

export interface TabItem {
  id: string;
  label: string;
}

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const tabPanelId = (prefix: string) => `${prefix}-panel`;

/** Tablist WAI-ARIA com foco itinerante: setas, Home e End. */
export function Tabs({
  items,
  active,
  onChange,
  idPrefix,
  label,
}: {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  idPrefix: string;
  label: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusTab(index: number) {
    const item = items[(index + items.length) % items.length];
    if (!item) return;
    onChange(item.id);
    refs.current[item.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const actions: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    const next = actions[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusTab(next);
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="scrollbar-none flex gap-6 overflow-x-auto border-b border-stone-200"
    >
      {items.map((item, index) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            ref={(element) => {
              refs.current[item.id] = element;
            }}
            id={tabId(idPrefix, item.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={tabPanelId(idPrefix)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`relative shrink-0 whitespace-nowrap py-3 text-sm font-semibold transition-colors ${
              selected ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {item.label}
            {selected ? (
              <motion.span
                layoutId={`${idPrefix}-indicator`}
                className="absolute inset-x-0 -bottom-px h-0.5 bg-el-red-600"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
