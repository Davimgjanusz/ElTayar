"use client";

import { Html, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PanoramaSphere } from "@/components/3d/PanoramaSphere";
import { Modal, modalControlStyles } from "@/components/ui/modal";
import { kalilTourRooms } from "@/data/kalil";
import { hasWebGL } from "@/lib/webgl";
import type { TourRoomId } from "@/types";

const FIRST_ROOM = kalilTourRooms[0]!;
const KEY_STEP = 0.14;

kalilTourRooms.forEach((room) => useTexture.preload(room.panoramaSrc ?? room.image.src));

export default function VirtualTourViewer({ onClose }: { onClose: () => void }) {
  const [roomId, setRoomId] = useState<TourRoomId>(FIRST_ROOM.id);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const hotspotLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setWebglAvailable(hasWebGL()), []);

  const room = kalilTourRooms.find((item) => item.id === roomId) ?? FIRST_ROOM;
  const roomLabels = useMemo(
    () =>
      Object.fromEntries(kalilTourRooms.map((item) => [item.id, item.label])) as Record<TourRoomId, string>,
    [],
  );

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    const controls = controlsRef.current;
    if (!controls) return;
    const yaw = { ArrowLeft: KEY_STEP, ArrowRight: -KEY_STEP }[event.key];
    const tilt = { ArrowUp: KEY_STEP, ArrowDown: -KEY_STEP }[event.key];
    if (yaw === undefined && tilt === undefined) return;
    event.preventDefault();
    // Com amortecimento, só uma fração do passo seria aplicada a cada tecla.
    controls.enableDamping = false;
    if (yaw !== undefined) controls.setAzimuthalAngle(controls.getAzimuthalAngle() + yaw);
    if (tilt !== undefined) controls.setPolarAngle(controls.getPolarAngle() + tilt);
    controls.update();
    controls.enableDamping = true;
  }

  return (
    <Modal label="Tour virtual do Edifício Kalil 321" onClose={onClose} onKeyDown={handleKeyDown}>
      {(close) => (
        <div className="relative size-full overflow-hidden bg-slate-950">
          {webglAvailable ? (
            <Canvas
              frameloop="demand"
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 0.01], fov: 50 }}
              aria-label={`Vista interna: ${room.image.alt}`}
            >
              <Suspense
                fallback={
                  <Html center>
                    <Loader2 className="size-8 animate-spin text-white" aria-label="Carregando cômodo" />
                  </Html>
                }
              >
                <PanoramaSphere
                  room={room}
                  roomLabels={roomLabels}
                  onNavigate={setRoomId}
                  controlsRef={controlsRef}
                  hotspotLayerRef={hotspotLayerRef}
                />
              </Suspense>
            </Canvas>
          ) : webglAvailable === false ? (
            <Image src={room.image.src} alt={room.image.alt} fill sizes="100vw" className="object-contain" />
          ) : null}

          <div ref={hotspotLayerRef} data-tour-hotspots className="pointer-events-none absolute inset-0" />

          {/* Cortina que suaviza a passagem entre cômodos. */}
          <motion.div
            key={room.id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-slate-950"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 bg-gradient-to-b from-slate-950/80 to-transparent p-4 pb-12 sm:p-6 sm:pb-16">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{room.label}</h2>
              <p className="mt-1 max-w-md text-sm text-white/80">{room.description}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar tour virtual"
              className={`pointer-events-auto shrink-0 ${modalControlStyles}`}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-12 sm:p-6 sm:pt-16">
            <p className="mb-3 text-center text-xs text-white/75">
              Arraste ou use as setas do teclado para olhar ao redor. Vista criada a partir de fotos do apartamento.
            </p>
            <div
              role="group"
              aria-label="Cômodos"
              className="scrollbar-none pointer-events-auto mx-auto flex w-fit max-w-full gap-1.5 overflow-x-auto"
            >
              {kalilTourRooms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === room.id}
                  onClick={() => setRoomId(item.id)}
                  className={`shrink-0 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                    item.id === room.id ? "bg-el-red-600 text-white" : "bg-white/15 text-white hover:bg-white/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
