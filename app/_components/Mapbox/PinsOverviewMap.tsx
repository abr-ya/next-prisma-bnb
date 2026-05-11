"use client";

import { FC, useEffect, useMemo, useState } from "react";
import Map, { Marker } from "react-map-gl";
import type { LngLatBoundsLike } from "mapbox-gl";
import type { default as MapboxGL } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { cn } from "@/lib/utils";

const SUPPORT_OPTIONS = { failIfMajorPerformanceCaveat: false } as const;

function getMapboxModule(mod: typeof import("mapbox-gl")): typeof MapboxGL {
  const m = mod.default ?? mod;
  return ("Map" in m && m.Map ? m : (m as unknown as { default: typeof MapboxGL }).default) as typeof MapboxGL;
}

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export type MapPinPoint = {
  id: string;
  title: string;
  pinLat: number;
  pinLon: number;
};

const DEFAULT_VIEW = { latitude: 20, longitude: 0, zoom: 2 };

function validPins(pins: MapPinPoint[]): MapPinPoint[] {
  return pins.filter(
    (p) =>
      Number.isFinite(p.pinLat) &&
      Number.isFinite(p.pinLon) &&
      p.pinLat >= -90 &&
      p.pinLat <= 90 &&
      p.pinLon >= -180 &&
      p.pinLon <= 180,
  );
}

function boundsFromPins(pins: MapPinPoint[]): LngLatBoundsLike | null {
  if (pins.length === 0) return null;
  let minLat = pins[0].pinLat;
  let maxLat = pins[0].pinLat;
  let minLng = pins[0].pinLon;
  let maxLng = pins[0].pinLon;
  for (const p of pins) {
    minLat = Math.min(minLat, p.pinLat);
    maxLat = Math.max(maxLat, p.pinLat);
    minLng = Math.min(minLng, p.pinLon);
    maxLng = Math.max(maxLng, p.pinLon);
  }
  const pad = minLat === maxLat && minLng === maxLng ? 0.025 : 0;
  return [
    [minLng - pad, minLat - pad],
    [maxLng + pad, maxLat + pad],
  ];
}

export interface PinsOverviewMapProps {
  pins: MapPinPoint[];
  className?: string;
  /** CSS height in px (default 384) */
  height?: number;
  mapStyle?: string;
}

function PinsOverviewFallback({
  pins,
  height,
  className,
}: {
  pins: MapPinPoint[];
  height: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-800",
        className,
      )}
      style={{ minHeight: height }}
    >
      <p className="text-neutral-600">
        The map cannot run here (WebGL / GPU).{" "}
        {pins.length > 0 ? "Open a pin on OpenStreetMap:" : "There are no pins with coordinates yet."}
      </p>
      <ul className="space-y-2">
        {pins.map((p) => (
          <li key={p.id}>
            <a
              className="font-medium text-rose-700 underline decoration-rose-400/70 underline-offset-2 hover:text-rose-900"
              href={`https://www.openstreetmap.org/?mlat=${p.pinLat}&mlon=${p.pinLon}&zoom=14`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.title}
            </a>
            <span className="text-neutral-500">
              {" "}
              ({p.pinLat.toFixed(4)}, {p.pinLon.toFixed(4)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Read-only Mapbox map with multiple markers. Pin title appears on hover (label + native `title`).
 */
const PinsOverviewMap: FC<PinsOverviewMapProps> = ({
  pins,
  className,
  height = 384,
  mapStyle = "mapbox://styles/mapbox/streets-v9",
}) => {
  const points = useMemo(() => validPins(pins), [pins]);
  const bounds = useMemo(() => boundsFromPins(points), [points]);

  const [supportsGl, setSupportsGl] = useState<boolean | null>(null);
  const [mapFailed, setMapFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("mapbox-gl")
      .then((mod) => {
        const mapboxgl = getMapboxModule(mod);
        if (cancelled || typeof mapboxgl.supported !== "function") return;
        setSupportsGl(mapboxgl.supported({ ...SUPPORT_OPTIONS }));
      })
      .catch(() => {
        if (!cancelled) setSupportsGl(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const initialViewState = useMemo(() => {
    if (bounds) {
      return {
        bounds,
        fitBoundsOptions: { padding: 56, maxZoom: 14 },
      } as const;
    }
    return DEFAULT_VIEW;
  }, [bounds]);

  if (supportsGl === false || mapFailed) {
    return <PinsOverviewFallback pins={points} height={height} className={cn("shadow-sm", className)} />;
  }

  if (supportsGl === null) {
    return (
      <div className={cn("w-full animate-pulse rounded-lg bg-neutral-100", className)} style={{ height }} aria-hidden />
    );
  }

  return (
    <div
      className={cn("w-full overflow-hidden rounded-lg border border-neutral-200 shadow-sm", className)}
      style={{ height }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        scrollZoom
        minZoom={2}
        maxZoom={18}
        failIfMajorPerformanceCaveat={false}
        // React 19 ignores defaultProps on forwardRef Maps; lib’s catch() calls this — must be a function.
        onError={(e) => {
          console.error(e.error);
          setMapFailed(true);
        }}
      >
        {points.map((pin) => (
          <Marker key={pin.id} longitude={pin.pinLon} latitude={pin.pinLat} anchor="bottom">
            <div className="group relative flex cursor-default flex-col items-center" title={pin.title}>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 max-w-[220px] -translate-x-1/2 truncate whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                {pin.title}
              </span>
              <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-rose-600 ring-2 ring-white shadow-md" aria-hidden />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default PinsOverviewMap;
