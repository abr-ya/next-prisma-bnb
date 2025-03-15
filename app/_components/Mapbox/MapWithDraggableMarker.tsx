"use client";

import { FC, useRef, useState } from "react";
import MapGL, { Marker, MarkerDragEvent } from "react-map-gl";
import { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

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

  const mapContainer = useRef(null);
  const mapRef = useRef(null);

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
