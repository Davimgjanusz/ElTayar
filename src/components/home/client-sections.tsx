"use client";

import dynamic from "next/dynamic";

/*
 * No App Router, next/dynamic com { ssr: false } só é permitido em Client
 * Components. Este módulo faz essa ponte para o page.tsx, que é Server Component.
 */
export const InstagramReel = dynamic(() => import("@/components/home/InstagramReel"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-[9/16] w-full max-w-xs animate-pulse rounded-lg bg-slate-100" />
  ),
});
