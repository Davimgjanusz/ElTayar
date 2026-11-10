import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types";

let adminClient: SupabaseClient<Database> | null = null;

/**
 * Cliente com service role: ignora RLS e existe apenas no servidor.
 * Retorna null quando o ambiente não está configurado, para que o chamador
 * responda com um erro tratado em vez de quebrar o build ou a página.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  adminClient ??= createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}
