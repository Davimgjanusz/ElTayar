import type {
  Differential,
  FloorPlan,
  GalleryCategory,
  LatLng,
  PointOfInterest,
  TechnicalFact,
  TourRoom,
} from "@/types";

export const KALIL_TITLE = "Edifício Kalil 321";
export const KALIL_SUBTITLE = "Sofisticação contemporânea e exclusividade residencial";
export const KALIL_STATUS = "Pronto para Morar";
export const KALIL_ADDRESS = "Rua Kalil, 321";
export const KALIL_REEL_URL = "https://www.instagram.com/reel/DXUEK0XEWvR/";

/**
 * PROVISÓRIO: pin e pontos de interesse foram levantados no 321 da Rua Antônio
 * Guganis (Jardim São Paulo), endereço da empresa em diretório público. Confirme
 * a localização do edifício e atualize este bloco e kalilPointsOfInterest juntos.
 */
export const kalilCoordinates: LatLng = { lat: -23.49672, lng: -46.61786 };

export const kalilCover = {
  src: "/images/kalil-fachada.jpg",
  alt: "Fachada do Edifício Kalil 321 em acabamento areia, com janelas de moldura branca e portão de ferro escuro trabalhado",
  width: 1360,
  height: 1020,
};

export const kalilFacts: TechnicalFact[] = [
  { label: "Status", value: KALIL_STATUS },
  { label: "Tipologias", value: "1 a 2 dormitórios" },
  { label: "Suíte", value: "Em todas as unidades" },
  { label: "Vagas", value: "Demarcadas e privativas" },
  { label: "Endereço", value: KALIL_ADDRESS },
];

const salaAparador = {
  src: "/images/kalil-sala-aparador.jpg",
  alt: "Living com sofá bege, aparador branco e amadeirado sob a janela e piso em porcelanato claro",
  width: 832,
  height: 582,
};

const cozinha = {
  src: "/images/kalil-cozinha.jpg",
  alt: "Cozinha americana com marcenaria sob medida em tons neutros, bancada em granito preto e mesa de jantar",
  width: 842,
  height: 578,
};

const suite = {
  src: "/images/kalil-suite.jpg",
  alt: "Suíte principal com cabeceira planejada em madeira clara, criados suspensos e janela ampla",
  width: 863,
  height: 580,
};

const banheiro = {
  src: "/images/kalil-banheiro.jpg",
  alt: "Banheiro com box em vidro temperado, bancada em pedra natural, gabinete branco e espelho amplo",
  width: 833,
  height: 581,
};

export const kalilGallery: GalleryCategory[] = [
  {
    id: "fachada",
    label: "Fachada",
    description: "Arquitetura moderna com portão em ferro escuro trabalhado e acabamento areia.",
    images: [kalilCover],
  },
  {
    id: "living",
    label: "Living & Jantar",
    description: "Piso em porcelanato claro, living integrado e ampla iluminação natural.",
    images: [
      {
        src: "/images/kalil-sala-jantar.jpg",
        alt: "Sala de jantar integrada ao living, com mesa de tampo branco, painel ripado de madeira e TV",
        width: 833,
        height: 578,
      },
      salaAparador,
      {
        src: "/images/kalil-sala-estar.jpg",
        alt: "Living com sofá bege e almofadas, integrado à cozinha ao fundo",
        width: 838,
        height: 582,
      },
    ],
  },
  {
    id: "cozinha",
    label: "Cozinha Americana",
    description: "Marcenaria sob medida em tons neutros e bancadas em granito preto São Gabriel.",
    images: [cozinha],
  },
  {
    id: "suite",
    label: "Dormitórios & Suíte",
    description: "Ambientes climatizados, cabeceira planejada e esquadrias antirruído.",
    images: [
      suite,
      {
        src: "/images/kalil-dormitorio.jpg",
        alt: "Dormitório de solteiro com cabeceira planejada e bancada de home office ao longo da parede",
        width: 834,
        height: 581,
      },
    ],
  },
  {
    id: "banheiros",
    label: "Banheiros",
    description: "Cubas esculpidas, bancadas em pedra natural e box em vidro temperado.",
    images: [banheiro],
  },
];

export const kalilFloorPlans: FloorPlan[] = [
  {
    id: "1-dormitorio",
    label: "1 dormitório",
    // PROVISÓRIO: metragem e distribuição ilustrativas.
    privateArea: 34,
    bedrooms: 1,
    suites: 1,
    bathrooms: 1,
    parkingSpaces: 1,
    rooms: ["Living integrado", "Cozinha americana", "Suíte", "Área de serviço"],
  },
  {
    id: "2-dormitorios",
    label: "2 dormitórios",
    // PROVISÓRIO: metragem e distribuição ilustrativas.
    privateArea: 48,
    bedrooms: 2,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 1,
    rooms: ["Living integrado", "Cozinha americana", "Suíte", "Dormitório", "Banho social", "Área de serviço"],
  },
];

export const kalilFinishes: Differential[] = [
  { icon: "layers", title: "Porcelanato claro", description: "Piso contínuo que amplia o living integrado e reflete a luz natural." },
  { icon: "hammer", title: "Marcenaria sob medida", description: "Cozinha e dormitórios planejados em tons neutros." },
  { icon: "gem", title: "Granito São Gabriel", description: "Bancadas em granito preto na cozinha e pedra natural nos banheiros." },
  { icon: "volume", title: "Esquadrias antirruído", description: "Conforto acústico para a suíte e os ambientes de descanso." },
];

export const kalilTechnical: Differential[] = [
  { icon: "droplets", title: "Medição individualizada", description: "Água e gás medidos por unidade." },
  { icon: "blinds", title: "Persianas integradas", description: "Janelas com persianas de enrolar." },
  { icon: "snowflake", title: "Pronto para climatização", description: "Infraestrutura para ar-condicionado na sala e nos quartos." },
  { icon: "leaf", title: "Louças e metais econômicos", description: "Acionamento que reduz o consumo de água." },
];

/**
 * Tour montado com as fotos planas do apartamento. Para giro completo,
 * preencha panoramaSrc de cada cômodo com uma foto equirretangular 360°.
 */
export const kalilTourRooms: TourRoom[] = [
  {
    id: "sala",
    label: "Sala de Estar",
    description: "Living integrado com porcelanato claro e iluminação natural.",
    image: salaAparador,
    hotspots: [
      { target: "cozinha", u: 0.12, v: 0.42 },
      { target: "banheiro", u: 0.33, v: 0.42 },
      { target: "suite", u: 0.9, v: 0.5 },
    ],
  },
  {
    id: "cozinha",
    label: "Cozinha Americana",
    description: "Marcenaria sob medida e bancada em granito preto São Gabriel.",
    image: cozinha,
    hotspots: [
      { target: "sala", u: 0.1, v: 0.5 },
      { target: "suite", u: 0.92, v: 0.5 },
    ],
  },
  {
    id: "suite",
    label: "Suíte",
    description: "Cabeceira planejada, ambiente climatizado e esquadrias antirruído.",
    image: suite,
    hotspots: [
      { target: "sala", u: 0.1, v: 0.5 },
      { target: "banheiro", u: 0.88, v: 0.5 },
    ],
  },
  {
    id: "banheiro",
    label: "Banheiro",
    description: "Box em vidro temperado e bancada em pedra natural.",
    image: banheiro,
    hotspots: [
      { target: "suite", u: 0.1, v: 0.5 },
      { target: "sala", u: 0.9, v: 0.35 },
    ],
  },
];

/**
 * Pontos reais do OpenStreetMap, ligados a kalilCoordinates. Tempo a pé estimado
 * pela distância em linha reta, com 30% de acréscimo pelo traçado das ruas (80 m/min).
 */
export const kalilPointsOfInterest: PointOfInterest[] = [
  { id: "metro", name: "Metrô Jardim São Paulo–Ayrton Senna (Linha 1-Azul)", category: "transporte", lat: -23.4924, lng: -46.61701, distanceMeters: 488, travelTime: "8 min a pé" },
  { id: "praca", name: "Praça Orlando Silva", category: "lazer", lat: -23.50113, lng: -46.61557, distanceMeters: 544, travelTime: "9 min a pé" },
  { id: "mercado", name: "Super Vizinho", category: "compras", lat: -23.49093, lng: -46.61912, distanceMeters: 656, travelTime: "11 min a pé" },
  { id: "san-paolo", name: "Hospital San Paolo", category: "saude", lat: -23.4958, lng: -46.62511, distanceMeters: 747, travelTime: "12 min a pé" },
  { id: "sao-camilo", name: "Hospital São Camilo", category: "saude", lat: -23.48764, lng: -46.62744, distanceMeters: 1405, travelTime: "23 min a pé" },
  { id: "madre-mazzarello", name: "Instituto Madre Mazzarello", category: "educacao", lat: -23.4921, lng: -46.63295, distanceMeters: 1622, travelTime: "26 min a pé" },
  { id: "pao-de-acucar", name: "Supermercado Pão de Açúcar", category: "compras", lat: -23.48896, lng: -46.6321, distanceMeters: 1689, travelTime: "27 min a pé" },
];
