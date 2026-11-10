import type { ReactNode } from "react";
import type { FloorPlanLayoutId } from "@/types";

/* Planta humanizada vetorial, ilustrativa: substitua via FloorPlan.image. */

const FLOOR = { porcelain: "#F4F2EC", oak: "#EBD9BC", tile: "#E6ECF1" };
const WALL = "#0F172A";
const WOOD = "#C9A876";
const FABRIC = "#D8CFC0";
const DARK = "#334155";

type Line = [number, number, number, number];

function Room({
  x,
  y,
  w,
  h,
  fill,
  label,
  labelX,
  labelY,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  label: string;
  labelX?: number;
  labelY?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      <text
        x={labelX ?? x + w / 2}
        y={labelY ?? y + h - 14}
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill={WALL}
      >
        {label}
      </text>
    </g>
  );
}

function Bed({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const pillows = w > 90 ? 2 : 1;
  const pillowWidth = (w - 12 - (pillows - 1) * 6) / pillows;
  return (
    <g>
      <rect x={x - 6} y={y - 7} width={w + 12} height={7} fill={WOOD} />
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#94A3B8" />
      {Array.from({ length: pillows }, (_, index) => (
        <rect
          key={index}
          x={x + 6 + index * (pillowWidth + 6)}
          y={y + 6}
          width={pillowWidth}
          height="22"
          rx="4"
          fill="#F8FAFC"
        />
      ))}
    </g>
  );
}

function Dining({ x, y }: { x: number; y: number }) {
  const chairs: [number, number][] = [
    [x + 18, y - 14],
    [x + 58, y - 14],
    [x + 18, y + 54],
    [x + 58, y + 54],
  ];
  return (
    <g>
      {chairs.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={cx - 10} y={cy} width="20" height="20" rx="4" fill="#CBD5E1" />
      ))}
      <rect x={x} y={y} width="76" height="52" rx="3" fill="#FFFFFF" stroke={WOOD} strokeWidth="2" />
    </g>
  );
}

function Living({ x, y, h, tvX }: { x: number; y: number; h: number; tvX: number }) {
  return (
    <g>
      <rect x={tvX + 42} y={y + 12} width="74" height={h - 24} rx="4" fill="#E3CFA9" opacity="0.7" />
      <rect x={tvX} y={y + 16} width="10" height={h - 32} fill={DARK} />
      <rect x={x} y={y} width="42" height={h} rx="6" fill={FABRIC} />
      <rect x={x + 26} y={y + 6} width="12" height={h - 12} rx="4" fill="#C4B9A6" />
    </g>
  );
}

function Kitchen({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="24" fill={DARK} />
      <rect x={x} y={y + 24} width="24" height={h} fill={DARK} />
      <rect x={x + w / 2 - 15} y={y + 5} width="30" height="14" rx="2" fill="#CBD5E1" />
      <rect x={x + 4} y={y + 40} width="16" height="16" fill="#64748B" />
    </g>
  );
}

function Bathroom({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width="52" height="52" fill="#FFFFFF" fillOpacity="0.6" stroke="#7DB7D9" strokeWidth="2" />
      <path d={`M${x} ${y}l52 52M${x + 52} ${y}l-52 52`} stroke="#7DB7D9" strokeWidth="1" />
      <rect x={x + w - 42} y={y} width="42" height="24" fill={WOOD} />
      <ellipse cx={x + w - 21} cy={y + 12} rx="11" ry="7" fill="#FFFFFF" />
      <ellipse cx={x + w - 21} cy={y + 62} rx="11" ry="14" fill="#FFFFFF" stroke="#CBD5E1" />
    </g>
  );
}

function Service({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="38" height="38" rx="3" fill="#FFFFFF" stroke="#CBD5E1" />
      <circle cx={x + 19} cy={y + 19} r="11" fill="none" stroke="#94A3B8" strokeWidth="2" />
      <rect x={x + 46} y={y} width="30" height="38" rx="3" fill="#FFFFFF" stroke="#CBD5E1" />
    </g>
  );
}

function Walls({ lines, doors, windows }: { lines: Line[]; doors: Line[]; windows: Line[] }) {
  const toProps = ([x1, y1, x2, y2]: Line) => ({ x1, y1, x2, y2 });
  return (
    <g strokeLinecap="square">
      {lines.map((line) => (
        <line key={line.join()} {...toProps(line)} stroke={WALL} strokeWidth="5" />
      ))}
      {doors.map((line) => (
        <line key={line.join()} {...toProps(line)} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="butt" />
      ))}
      {windows.map((line) => (
        <line key={line.join()} {...toProps(line)} stroke="#7DB7D9" strokeWidth="7" strokeLinecap="butt" />
      ))}
    </g>
  );
}

function OneBedroom() {
  return (
    <>
      <Room x={20} y={20} w={160} h={150} fill={FLOOR.porcelain} label="Cozinha" labelX={108} labelY={120} />
      <Room x={20} y={170} w={160} h={170} fill={FLOOR.porcelain} label="Jantar" />
      <Room x={180} y={20} w={200} h={320} fill={FLOOR.porcelain} label="Estar" />
      <Room x={380} y={20} w={240} h={190} fill={FLOOR.oak} label="Suíte" labelX={436} labelY={120} />
      <Room x={380} y={210} w={110} h={130} fill={FLOOR.tile} label="Serviço" labelY={324} />
      <Room x={490} y={210} w={130} h={130} fill={FLOOR.tile} label="Banho" labelX={530} labelY={324} />
      <Kitchen x={28} y={28} w={144} h={72} />
      <Dining x={62} y={230} />
      <Living x={330} y={90} h={150} tvX={186} />
      <Bed x={470} y={38} w={124} h={118} />
      <rect x={442} y={32} width="22" height="22" fill={WOOD} />
      <Service x={392} y={222} />
      <Bathroom x={500} y={222} w={108} />
      <Walls
        lines={[
          [20, 20, 620, 20],
          [620, 20, 620, 340],
          [620, 340, 20, 340],
          [20, 340, 20, 20],
          [380, 20, 380, 340],
          [380, 210, 620, 210],
          [490, 210, 490, 340],
        ]}
        doors={[
          [380, 165, 380, 200],
          [380, 262, 380, 297],
          [530, 210, 565, 210],
          [60, 340, 100, 340],
        ]}
        windows={[
          [230, 20, 340, 20],
          [470, 20, 590, 20],
          [620, 262, 620, 300],
        ]}
      />
    </>
  );
}

function TwoBedrooms() {
  return (
    <>
      <Room x={20} y={20} w={150} h={150} fill={FLOOR.porcelain} label="Cozinha" labelX={104} labelY={120} />
      <Room x={20} y={170} w={150} h={230} fill={FLOOR.porcelain} label="Jantar" />
      <Room x={170} y={20} w={190} h={380} fill={FLOOR.porcelain} label="Estar" />
      <Room x={360} y={20} w={220} h={180} fill={FLOOR.oak} label="Suíte" labelX={412} labelY={120} />
      <Room x={580} y={20} w={160} h={90} fill={FLOOR.tile} label="Banho suíte" labelX={665} labelY={98} />
      <Room x={580} y={110} w={160} h={90} fill={FLOOR.tile} label="Serviço" labelX={695} labelY={186} />
      <Room x={360} y={200} w={380} h={50} fill={FLOOR.porcelain} label="Circulação" labelY={231} />
      <Room x={360} y={250} w={130} h={150} fill={FLOOR.tile} label="Banho" labelX={410} labelY={386} />
      <Room x={490} y={250} w={250} h={150} fill={FLOOR.oak} label="Dormitório" labelX={574} labelY={386} />
      <Kitchen x={28} y={28} w={134} h={72} />
      <Dining x={56} y={250} />
      <Living x={310} y={120} h={170} tvX={176} />
      <Bed x={448} y={38} w={120} h={116} />
      <rect x={420} y={32} width="22" height="22" fill={WOOD} />
      <Bathroom x={372} y={262} w={106} />
      <g>
        <rect x={590} y={32} width="44" height="44" fill="#FFFFFF" fillOpacity="0.6" stroke="#7DB7D9" strokeWidth="2" />
        <rect x={700} y={30} width="34" height="24" fill={WOOD} />
        <ellipse cx={717} cy={42} rx="10" ry="7" fill="#FFFFFF" />
      </g>
      <Service x={592} y={122} />
      <Bed x={662} y={272} w={70} h={118} />
      <rect x={500} y={262} width="130" height="26" fill={WOOD} />
      <Walls
        lines={[
          [20, 20, 740, 20],
          [740, 20, 740, 400],
          [740, 400, 20, 400],
          [20, 400, 20, 20],
          [360, 20, 360, 400],
          [360, 200, 740, 200],
          [360, 250, 740, 250],
          [580, 20, 580, 200],
          [580, 110, 740, 110],
          [490, 250, 490, 400],
        ]}
        doors={[
          [360, 207, 360, 243],
          [400, 200, 438, 200],
          [400, 250, 438, 250],
          [560, 250, 598, 250],
          [580, 40, 580, 76],
          [640, 200, 678, 200],
          [60, 400, 100, 400],
        ]}
        windows={[
          [210, 20, 320, 20],
          [450, 20, 560, 20],
          [740, 300, 740, 360],
          [660, 20, 690, 20],
        ]}
      />
    </>
  );
}

const layouts: Record<FloorPlanLayoutId, { viewBox: string; drawing: ReactNode }> = {
  "1-dormitorio": { viewBox: "0 0 640 360", drawing: <OneBedroom /> },
  "2-dormitorios": { viewBox: "0 0 760 420", drawing: <TwoBedrooms /> },
};

export function FloorPlanDrawing({ layout, label }: { layout: FloorPlanLayoutId; label: string }) {
  const { viewBox, drawing } = layouts[layout];
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="h-auto w-full font-sans">
      {drawing}
    </svg>
  );
}
