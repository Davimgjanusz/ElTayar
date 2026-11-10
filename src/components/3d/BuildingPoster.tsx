import Image from "next/image";
import { kalilCover } from "@/data/kalil";

/** Fallback leve: aparece enquanto o 3D carrega e fica se não houver WebGL. */
export function BuildingPoster() {
  return (
    <Image
      src={kalilCover.src}
      alt={kalilCover.alt}
      fill
      sizes="(min-width: 1024px) 640px, 100vw"
      className="object-cover"
    />
  );
}
