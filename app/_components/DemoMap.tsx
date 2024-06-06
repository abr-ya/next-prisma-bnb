"use client";

import { FC } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const ICON = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [32, 32],
});

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
