"use client";

import { FC } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ICON } from "./Leaflet/markerIcons";

interface IDemoMap {
  latLang: [number, number];
}

const DemoMap: FC<IDemoMap> = ({ latLang }) => (
  <MapContainer scrollWheelZoom={false} className="h-[50vh] rounded-lg relative z-0" center={latLang} zoom={8}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker position={latLang} icon={ICON} />
  </MapContainer>
);

export default DemoMap;
