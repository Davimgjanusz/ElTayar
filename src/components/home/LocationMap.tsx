"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useRef } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLng, PointOfInterest } from "@/types";

const BRAND_RED = "#E11D2A";

function pinHtml(size: number, inner: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size * 1.3)}" viewBox="0 0 30 39"><path fill="${BRAND_RED}" stroke="#fff" stroke-width="2" d="M15 1C7.3 1 1 7.2 1 14.9 1 25.3 15 38 15 38s14-12.7 14-23.1C29 7.2 22.7 1 15 1z"/>${inner}</svg>`;
}

const buildingIcon = L.divIcon({
  className: "map-pin",
  html: pinHtml(46, '<path fill="#fff" d="M15 6.5 7 12.2V22h5.5v-5h5v5H23v-9.8z"/>'),
  iconSize: [46, 60],
  iconAnchor: [23, 60],
  popupAnchor: [0, -56],
});

const pointIcon = L.divIcon({
  className: "map-pin",
  html: pinHtml(26, '<circle cx="15" cy="15" r="5.5" fill="#fff"/>'),
  iconSize: [26, 34],
  iconAnchor: [13, 34],
  popupAnchor: [0, -30],
});

const radiusStyle = {
  color: BRAND_RED,
  weight: 1.5,
  dashArray: "5 7",
  fillOpacity: 0.04,
} as const;

function FlyToActive({ point }: { point?: PointOfInterest }) {
  const map = useMap();

  useEffect(() => {
    if (!point) return;
    map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [map, point]);

  return null;
}

function PointMarker({ point, active }: { point: PointOfInterest; active: boolean }) {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (active) markerRef.current?.openPopup();
  }, [active]);

  return (
    <Marker ref={markerRef} position={[point.lat, point.lng]} icon={pointIcon} title={point.name}>
      <Popup>
        <strong className="block text-slate-900">{point.name}</strong>
        <span className="text-slate-600">{point.travelTime}</span>
      </Popup>
    </Marker>
  );
}

export default function LocationMap({
  origin,
  originLabel,
  originAddress,
  points,
  activeId,
}: {
  origin: LatLng;
  originLabel: string;
  originAddress: string;
  points: PointOfInterest[];
  activeId: string | null;
}) {
  const center: [number, number] = [origin.lat, origin.lng];

  return (
    <div className="map-mono isolate size-full">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        dragging={!L.Browser.mobile}
        className="size-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={center} radius={500} pathOptions={radiusStyle} />
        <Circle center={center} radius={1000} pathOptions={radiusStyle} />
        <Marker position={center} icon={buildingIcon} title={originLabel} zIndexOffset={500}>
          <Popup>
            <strong className="block text-slate-900">{originLabel}</strong>
            <span className="text-slate-600">{originAddress}</span>
          </Popup>
        </Marker>
        {points.map((point) => (
          <PointMarker key={point.id} point={point} active={point.id === activeId} />
        ))}
        <FlyToActive point={points.find((point) => point.id === activeId)} />
      </MapContainer>
    </div>
  );
}
