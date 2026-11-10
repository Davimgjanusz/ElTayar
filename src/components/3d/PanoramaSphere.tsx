"use client";

import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, type RefObject } from "react";
import { BackSide, MathUtils, RepeatWrapping, SRGBColorSpace, type PerspectiveCamera } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { TourRoom, TourRoomId } from "@/types";

const RADIUS = 10;
const HOTSPOT_RADIUS = 9;

/* Foto plana ocupa uma calota com a proporção da imagem (3:2), sem achatá-la. */
const PHOTO_ARC_H = MathUtils.degToRad(125);
const PHOTO_ARC_V = MathUtils.degToRad(85);

function roomArcs(room: TourRoom) {
  return room.panoramaSrc
    ? { horizontal: Math.PI * 2, vertical: Math.PI, full: true }
    : { horizontal: PHOTO_ARC_H, vertical: PHOTO_ARC_V, full: false };
}

function Controls({
  room,
  controlsRef,
}: {
  room: TourRoom;
  controlsRef: RefObject<OrbitControlsImpl | null>;
}) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const { horizontal, vertical, full } = roomArcs(room);

  // Cada cômodo começa olhando para o centro da foto.
  useEffect(() => {
    camera.position.set(0, 0, 0.01);
    controlsRef.current?.update();
    invalidate();
  }, [camera, controlsRef, invalidate, room.id]);

  // Limites calculados pela tela, para a borda da foto nunca aparecer.
  const verticalFov = MathUtils.degToRad(camera.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * (size.width / size.height));
  const maxYaw = Math.max(0, (horizontal - horizontalFov) / 2);
  const maxTilt = Math.max(0, (vertical - verticalFov) / 2);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0, 0]}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={-0.35}
      minAzimuthAngle={full ? -Infinity : -maxYaw}
      maxAzimuthAngle={full ? Infinity : maxYaw}
      minPolarAngle={full ? 0.2 : Math.PI / 2 - maxTilt}
      maxPolarAngle={full ? Math.PI - 0.2 : Math.PI / 2 + maxTilt}
    />
  );
}

export function PanoramaSphere({
  room,
  roomLabels,
  onNavigate,
  controlsRef,
  hotspotLayerRef,
}: {
  room: TourRoom;
  roomLabels: Record<TourRoomId, string>;
  onNavigate: (id: TourRoomId) => void;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  /** Camada DOM dos hotspots; sem ela o drei monta o primeiro em outro nó. */
  hotspotLayerRef: RefObject<HTMLDivElement | null>;
}) {
  const texture = useTexture(room.panoramaSrc ?? room.image.src);
  const invalidate = useThree((state) => state.invalidate);
  const { horizontal, vertical } = roomArcs(room);

  useLayoutEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    // A esfera é vista por dentro: a textura precisa ser espelhada no eixo horizontal.
    texture.wrapS = RepeatWrapping;
    texture.repeat.x = -1;
    texture.offset.x = 1;
    texture.needsUpdate = true;
    invalidate();
  }, [texture, invalidate]);

  const hotspots = useMemo(
    () =>
      room.hotspots.map((hotspot) => {
        const yaw = (hotspot.u - 0.5) * horizontal;
        const pitch = (0.5 - hotspot.v) * vertical;
        return {
          ...hotspot,
          position: [
            HOTSPOT_RADIUS * Math.sin(yaw) * Math.cos(pitch),
            HOTSPOT_RADIUS * Math.sin(pitch),
            -HOTSPOT_RADIUS * Math.cos(yaw) * Math.cos(pitch),
          ] as [number, number, number],
        };
      }),
    [room, horizontal, vertical],
  );

  return (
    <>
      <mesh>
        <sphereGeometry
          args={[
            RADIUS,
            64,
            40,
            (3 * Math.PI) / 2 - horizontal / 2,
            horizontal,
            Math.PI / 2 - vertical / 2,
            vertical,
          ]}
        />
        <meshBasicMaterial map={texture} side={BackSide} toneMapped={false} />
      </mesh>

      {hotspots.map((hotspot) => (
        <Html
          key={hotspot.target}
          position={hotspot.position}
          center
          zIndexRange={[20, 0]}
          portal={hotspotLayerRef as RefObject<HTMLElement>}
        >
          <button
            type="button"
            onClick={() => onNavigate(hotspot.target)}
            className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-2 pl-3 pr-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/30 transition-colors hover:bg-el-red-600 hover:text-white"
          >
            <ArrowUpRight className="size-4 text-el-red-600 [button:hover_&]:text-white" aria-hidden="true" />
            {roomLabels[hotspot.target]}
          </button>
        </Html>
      ))}

      <Controls room={room} controlsRef={controlsRef} />
    </>
  );
}
