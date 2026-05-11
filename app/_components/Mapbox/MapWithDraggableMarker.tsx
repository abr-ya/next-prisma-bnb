"use client";

import { FC, useCallback, useRef, useState } from "react";
import MapGL, { Marker, MarkerDragEvent } from "react-map-gl";
import type { ErrorEvent as MapboxErrorEvent } from "mapbox-gl";
import { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

function buildMapStartupFailureMessage(cause: unknown): string {
  const err = cause instanceof Error ? cause : new Error(typeof cause === "string" ? cause : "Unknown error");
  const detail = err.message?.trim() ? err.message : String(cause);

  return [
    "The interactive map failed to start.",
    "",
    "Technical detail:",
    detail,
    "",
    "What you can try:",
    "• Turn on hardware acceleration in your browser (e.g. Chrome: Settings → System → “Use graphics acceleration when available”, then restart the browser).",
    "• Update GPU drivers. WebGL is often limited in virtual machines, over RDP, or on very old devices.",
    "• Ensure MAPBOX_TOKEN is set for this app and matches a valid Mapbox access token.",
    "• Try another browser or a private window without extensions that block WebGL or canvases.",
    "• If you are on a corporate network, check that Mapbox and tile requests are not blocked by a firewall or proxy.",
  ].join("\n");
}

export interface IMapBoxView {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface IMapWithDraggableMarker {
  initView: IMapBoxView;
  pin?: { lat: number; lng: number };
  coordHandler?: (pin: { lat: number; lng: number }) => void;
  isDisabled?: boolean;
}

const MapWithDraggableMarker: FC<IMapWithDraggableMarker> = ({ initView, coordHandler, isDisabled }) => {
  const [viewState, setViewState] = useState(initView);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>({
    lat: initView.latitude,
    lng: initView.longitude,
  });
  const [mapErrorText, setMapErrorText] = useState<string | null>(null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const handleMapError = useCallback((evt: MapboxErrorEvent) => {
    const raw = evt.error as unknown;
    const underlying =
      raw instanceof Error
        ? raw
        : typeof raw === "object" &&
            raw !== null &&
            "message" in raw &&
            typeof (raw as { message: unknown }).message === "string"
          ? new Error((raw as { message: string }).message)
          : new Error("Map reported an error without a message.");
    const text = buildMapStartupFailureMessage(underlying);
    console.error("[MapWithDraggableMarker] Map failed:", underlying);
    setMapErrorText(text);
  }, []);

  const mapClickHandler = (evt: MapMouseEvent) => {
    if (isDisabled) return;

    const coord = evt.lngLat;
    if (coordHandler) coordHandler(coord);
    setMarker(coord);
  };

  const markerDragHandler = (evt: MarkerDragEvent) => {
    if (isDisabled) return;

    const coord = evt.lngLat;
    if (coordHandler) coordHandler(coord);
    setMarker(coord);
  };

  const markerClickHandler = (evt: MapMouseEvent) => {
    evt.originalEvent.stopPropagation();
    console.log("click to marker");
    setMarker(null);
  };

  if (mapErrorText) {
    return (
      <div ref={mapContainer} className="flex h-full min-h-[200px] flex-col" style={{ height: "100%" }}>
        <div
          role="alert"
          className="max-h-full flex-1 overflow-auto rounded-md border border-red-200 bg-red-50 p-4 text-left text-sm leading-relaxed text-red-950"
        >
          <p className="font-semibold text-red-900">Map unavailable</p>
          <pre className="mt-3 whitespace-pre-wrap font-sans">{mapErrorText}</pre>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapContainer} style={{ height: "100%" }}>
      <MapGL
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={mapClickHandler}
        cursor="pointer"
        maxZoom={20}
        minZoom={3}
        failIfMajorPerformanceCaveat={false}
        onError={handleMapError}
      >
        {marker && (
          <div>
            <Marker
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="center"
              color="red"
              draggable={!isDisabled}
              onDragEnd={markerDragHandler}
              onClick={markerClickHandler}
            />
          </div>
        )}
      </MapGL>
    </div>
  );
};

export default MapWithDraggableMarker;
