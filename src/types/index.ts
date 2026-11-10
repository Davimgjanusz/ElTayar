/* -------------------------------------------------------------------------- */
/* Edifício Kalil 321                                                         */
/* -------------------------------------------------------------------------- */

export interface PropertyImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryCategory {
  id: string;
  label: string;
  description: string;
  images: PropertyImage[];
}

export interface TechnicalFact {
  label: string;
  value: string;
}

export type FloorPlanLayoutId = "1-dormitorio" | "2-dormitorios";

export interface FloorPlan {
  id: FloorPlanLayoutId;
  label: string;
  privateArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  rooms: string[];
  /** Quando definida, substitui a planta vetorial ilustrativa. */
  image?: PropertyImage;
}

export type DifferentialIcon =
  | "layers"
  | "hammer"
  | "gem"
  | "volume"
  | "droplets"
  | "blinds"
  | "snowflake"
  | "leaf";

export interface Differential {
  title: string;
  description: string;
  icon: DifferentialIcon;
}

/* -------------------------------------------------------------------------- */
/* Tour virtual                                                               */
/* -------------------------------------------------------------------------- */

export type TourRoomId = "sala" | "cozinha" | "suite" | "banheiro";

export interface TourHotspot {
  target: TourRoomId;
  /** Posição na imagem, de 0 (esquerda) a 1 (direita). */
  u: number;
  /** Posição na imagem, de 0 (topo) a 1 (base). */
  v: number;
}

export interface TourRoom {
  id: TourRoomId;
  label: string;
  description: string;
  image: PropertyImage;
  /** Foto equirretangular 360°. Quando definida, o cômodo gira por completo. */
  panoramaSrc?: string;
  hotspots: TourHotspot[];
}

/* -------------------------------------------------------------------------- */
/* Localização                                                                */
/* -------------------------------------------------------------------------- */

export type PoiCategory = "transporte" | "educacao" | "saude" | "compras" | "lazer";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface PointOfInterest extends LatLng {
  id: string;
  name: string;
  category: PoiCategory;
  /** Distância em linha reta, em metros. */
  distanceMeters: number;
  travelTime: string;
}

/* -------------------------------------------------------------------------- */
/* Leads                                                                      */
/* -------------------------------------------------------------------------- */

export type LeadIntent = "contato" | "visita";
export type ContactMethod = "email" | "whatsapp" | "ambos";
export type VisitPeriod = "manha" | "tarde";
export type LeadStatus = "novo" | "em_atendimento" | "convertido" | "descartado";

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
}

export interface LeadActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
}

/* -------------------------------------------------------------------------- */
/* Banco de dados (espelho de schema.sql)                                     */
/* -------------------------------------------------------------------------- */

export type LeadRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  property_interest: string;
  intent: LeadIntent;
  contact_method: ContactMethod;
  visit_date: string | null;
  visit_period: VisitPeriod | null;
  message: string | null;
  consent_lgpd: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: LeadStatus;
};

export type LeadInsert = Omit<LeadRow, "id" | "created_at" | "status">;

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadRow>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
