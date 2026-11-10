-- El Tayar Empreendimentos Imobiliários: schema do Supabase (PostgreSQL)
-- Execute no SQL Editor do projeto. O script pode ser reexecutado.

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    property_interest VARCHAR(100) NOT NULL DEFAULT 'Edifício Kalil 321',
    intent VARCHAR(20) NOT NULL DEFAULT 'contato'
        CHECK (intent IN ('contato', 'visita')),
    contact_method VARCHAR(20) NOT NULL DEFAULT 'email'
        CHECK (contact_method IN ('email', 'whatsapp', 'ambos')),
    visit_date DATE,
    visit_period VARCHAR(10) CHECK (visit_period IN ('manha', 'tarde')),
    message TEXT CHECK (char_length(message) <= 600),
    -- Sem consentimento o registro não existe (LGPD).
    consent_lgpd BOOLEAN NOT NULL CHECK (consent_lgpd = TRUE),
    utm_source VARCHAR(80),
    utm_medium VARCHAR(80),
    utm_campaign VARCHAR(80),
    status VARCHAR(30) NOT NULL DEFAULT 'novo'
        CHECK (status IN ('novo', 'em_atendimento', 'convertido', 'descartado')),
    CONSTRAINT visita_exige_data CHECK (
        intent <> 'visita' OR (visit_date IS NOT NULL AND visit_period IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);

-- RLS ligada e nenhuma política: anon e authenticated não leem nem gravam leads.
-- A gravação passa só pela Server Action, que valida com Zod e usa a service role.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
