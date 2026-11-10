"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { Rotate3d } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MeshStandardMaterial } from "three";
import { BuildingPoster } from "@/components/3d/BuildingPoster";
import { hasWebGL } from "@/lib/webgl";

type Vec3 = [number, number, number];

const TARGET: Vec3 = [0, 4.6, 0];

function useMaterials() {
  return useMemo(
    () => ({
      facade: new MeshStandardMaterial({ color: "#D9B77F", roughness: 0.92 }),
      white: new MeshStandardMaterial({ color: "#F7F5F0", roughness: 0.6 }),
      glass: new MeshStandardMaterial({ color: "#6F8FA8", roughness: 0.25, metalness: 0.05 }),
      iron: new MeshStandardMaterial({ color: "#14161A", roughness: 0.5, metalness: 0.4 }),
      green: new MeshStandardMaterial({ color: "#4F7A3A", roughness: 0.95 }),
      trunk: new MeshStandardMaterial({ color: "#6B5A45", roughness: 1 }),
      pavement: new MeshStandardMaterial({ color: "#CFCBC3", roughness: 1 }),
    }),
    [],
  );
}

type Materials = ReturnType<typeof useMaterials>;

function Box({
  position,
  size,
  material,
}: {
  position: Vec3;
  size: Vec3;
  material: MeshStandardMaterial;
}) {
  return (
    <mesh position={position} material={material}>
      <boxGeometry args={size} />
    </mesh>
  );
}

function BuildingWindow({
  x,
  y,
  z,
  width,
  height,
  materials,
}: {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  materials: Materials;
}) {
  return (
    <group position={[x, y, z]}>
      <Box position={[0, 0, 0]} size={[width + 0.26, height + 0.26, 0.12]} material={materials.white} />
      <Box position={[0, 0, 0.05]} size={[width, height, 0.06]} material={materials.glass} />
      <Box position={[0, -height / 2 - 0.17, 0.08]} size={[width + 0.5, 0.1, 0.24]} material={materials.white} />
    </group>
  );
}

function Tower({ x, materials }: { x: number; materials: Materials }) {
  return (
    <group>
      <Box position={[x, 4.8, -2.5]} size={[3.6, 9.6, 6]} material={materials.facade} />
      <Box position={[x, 9.72, -2.5]} size={[3.9, 0.24, 6.3]} material={materials.white} />
      <Box position={[x, 9.42, -2.5]} size={[3.72, 0.16, 6.12]} material={materials.white} />
      {[3.5, 5.95, 8.35].map((y) => (
        <BuildingWindow key={y} x={x} y={y} z={0.53} width={1.3} height={1.2} materials={materials} />
      ))}
    </group>
  );
}

const CROSS_WIDTH = 0.9;
const CROSS_HEIGHT = 0.55;
const CROSS_ANGLE = Math.atan2(CROSS_HEIGHT, CROSS_WIDTH);
const CROSS_LENGTH = Math.hypot(CROSS_WIDTH, CROSS_HEIGHT);

function Fence({ materials }: { materials: Materials }) {
  const { bars, crosses } = useMemo(() => {
    const barPositions: number[] = [];
    for (let x = -5.2; x <= 7.21; x += 0.28) barPositions.push(Number(x.toFixed(2)));
    const crossPositions: number[] = [];
    for (let x = -4.75; x <= 6.9; x += CROSS_WIDTH) crossPositions.push(Number(x.toFixed(2)));
    return { bars: barPositions, crosses: crossPositions };
  }, []);

  return (
    <group position={[0, 0, 3.2]}>
      <Box position={[1, 2.75, 0]} size={[12.8, 0.14, 0.14]} material={materials.iron} />
      <Box position={[1, 2.2, 0]} size={[12.8, 0.08, 0.08]} material={materials.iron} />
      <Box position={[1, 0.18, 0]} size={[12.8, 0.36, 0.3]} material={materials.white} />
      {[-5.3, -3, 2.4, 7.3].map((x) => (
        <Box key={x} position={[x, 1.4, 0]} size={[0.2, 2.8, 0.2]} material={materials.iron} />
      ))}
      {bars.map((x) => (
        <Box key={x} position={[x, 1.28, 0]} size={[0.05, 1.84, 0.05]} material={materials.iron} />
      ))}
      {/* Faixa em X do gradil, como no portão real. */}
      {crosses.flatMap((x) =>
        [1, -1].map((direction) => (
          <mesh
            key={`${x}-${direction}`}
            position={[x, 2.475, 0]}
            rotation={[0, 0, direction * CROSS_ANGLE]}
            material={materials.iron}
          >
            <boxGeometry args={[CROSS_LENGTH, 0.05, 0.05]} />
          </mesh>
        )),
      )}
    </group>
  );
}

function Palm({ position, materials }: { position: Vec3; materials: Materials }) {
  return (
    <group position={position}>
      <mesh position={[0, 2.6, 0]} material={materials.trunk}>
        <cylinderGeometry args={[0.16, 0.24, 5.2, 8]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
        <mesh
          key={index}
          position={[0, 5.2, 0]}
          rotation={[0, (index * Math.PI) / 4, 1.05]}
          material={materials.green}
        >
          <coneGeometry args={[0.32, 3.4, 4]} />
        </mesh>
      ))}
    </group>
  );
}

function KalilBuilding() {
  const materials = useMaterials();

  useEffect(
    () => () => Object.values(materials).forEach((material) => material.dispose()),
    [materials],
  );

  return (
    <group>
      <Box position={[0, -0.05, 0]} size={[90, 0.1, 70]} material={materials.pavement} />

      <Tower x={-3.4} materials={materials} />
      <Tower x={3.4} materials={materials} />

      <Box position={[0, 4.6, -3]} size={[3.2, 9.2, 5]} material={materials.facade} />
      <Box position={[0, 9.28, -3]} size={[3.4, 0.2, 5.2]} material={materials.white} />
      {[3.1, 4.9, 6.7, 8.5].flatMap((y) =>
        [-0.6, 0.6].map((x) => (
          <BuildingWindow key={`${x}-${y}`} x={x} y={y} z={-0.42} width={0.52} height={0.56} materials={materials} />
        )),
      )}

      <Box position={[-5.4, 2.92, 1.4]} size={[6.2, 0.14, 4.4]} material={materials.iron} />
      {[-8.3, -2.6].map((x) => (
        <Box key={x} position={[x, 1.42, 3.4]} size={[0.14, 2.9, 0.14]} material={materials.iron} />
      ))}

      <Fence materials={materials} />
      <Box position={[2.5, 0.7, 1.9]} size={[9, 1.4, 1]} material={materials.green} />
      <Box position={[-7, 0.35, 2.6]} size={[3, 0.7, 0.8]} material={materials.green} />

      <Palm position={[-8.2, 0, -1.5]} materials={materials} />
      <Palm position={[-9.6, 0, 1]} materials={materials} />
    </group>
  );
}

const CAMERA_X = 10;
const CAMERA_Y = 6.5;
const CAMERA_Z = 27;
const ORBIT_RADIUS = Math.hypot(CAMERA_X, CAMERA_Z);
const BASE_AZIMUTH = Math.atan2(CAMERA_X, CAMERA_Z);

/** Enquadra o prédio e faz a órbita suave até o visitante assumir o controle. */
function CameraOrbit({ active }: { active: boolean }) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    camera.lookAt(...TARGET);
    invalidate();
  }, [camera, invalidate]);

  useFrame((state) => {
    if (!active) return;
    const azimuth = BASE_AZIMUTH + Math.sin(state.clock.elapsedTime * 0.22) * 0.5;
    camera.position.set(Math.sin(azimuth) * ORBIT_RADIUS, CAMERA_Y, Math.cos(azimuth) * ORBIT_RADIUS);
    camera.lookAt(...TARGET);
  });

  return null;
}

export default function BuildingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [orbiting, setOrbiting] = useState(false);

  useEffect(() => {
    setWebglAvailable(hasWebGL());
    // Em telas de toque, o giro só liga a pedido para o dedo continuar rolando a página.
    setInteractive(window.matchMedia("(pointer: fine)").matches);
    setOrbiting(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div ref={containerRef} className="relative size-full bg-gradient-to-b from-[#DCE9F3] to-sand-100">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <BuildingPoster />
      </div>

      {webglAvailable ? (
        <Canvas
          aria-label="Modelo 3D volumétrico da fachada do Edifício Kalil 321"
          frameloop={orbiting && inView ? "always" : "demand"}
          dpr={[1, 1.5]}
          camera={{ position: [CAMERA_X, CAMERA_Y, CAMERA_Z], fov: 30 }}
          onCreated={() => setReady(true)}
          className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          style={{ touchAction: interactive ? "none" : "pan-y" }}
        >
          <hemisphereLight args={["#E6F1FB", "#B9A98C", 1.3]} />
          <directionalLight position={[9, 16, 12]} intensity={2.4} color="#FFF4E2" />
          <KalilBuilding />
          <ContactShadows position={[0, 0.01, 0]} scale={30} blur={2.4} opacity={0.35} frames={1} />
          <CameraOrbit active={orbiting} />
          {interactive ? (
            <OrbitControls
              target={TARGET}
              onStart={() => setOrbiting(false)}
              enablePan={false}
              enableZoom={false}
              enableDamping
              minPolarAngle={1.05}
              maxPolarAngle={Math.PI / 2 - 0.03}
              minAzimuthAngle={-1}
              maxAzimuthAngle={1}
            />
          ) : null}
        </Canvas>
      ) : null}

      {webglAvailable && ready && !interactive ? (
        <button
          type="button"
          onClick={() => {
            setInteractive(true);
            setOrbiting(false);
          }}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Rotate3d className="size-4" aria-hidden="true" />
          Toque para girar
        </button>
      ) : null}
    </div>
  );
}
