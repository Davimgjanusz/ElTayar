"use client";

import { useEffect, useState } from "react";
import type { UtmParams } from "@/types";

const STORAGE_KEY = "el-tayar-utm";

function readParam(query: URLSearchParams, name: string): string | undefined {
  return query.get(name)?.trim().slice(0, 80) || undefined;
}

/** UTMs da visita, preservadas durante a sessão mesmo após navegar por âncoras. */
export function useUtm(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const fromUrl: UtmParams = {
      source: readParam(query, "utm_source"),
      medium: readParam(query, "utm_medium"),
      campaign: readParam(query, "utm_campaign"),
    };
    const hasUtm = Boolean(fromUrl.source || fromUrl.medium || fromUrl.campaign);

    let resolved = fromUrl;
    try {
      if (hasUtm) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      } else {
        resolved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as UtmParams;
      }
    } catch {
      // Armazenamento bloqueado pelo navegador: seguimos só com a URL atual.
    }
    setUtm(resolved);
  }, []);

  return utm;
}
