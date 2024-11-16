"use client";

import React, { useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { IPlace } from "../models";
import { ICON } from "@/app/_components/Leaflet/markerIcons";

interface IPlacesMap {
  places: IPlace[];
  // togglePreview: (val: boolean) => void;
  // isVisible, , selectedPlace, togglePreview, setPlaceForPreview
}

const PlacesMap = ({ places }: IPlacesMap) => {
  const [isVisible, SetIsVisible] = useState(true);
  const [selectedPlace, SetSelectedPlace] = useState<IPlace | null>(null);
  const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

  // todo: move to props
  const togglePreview = (val: boolean) => {
    console.log("togglePreview", val);
  };

  const markerClickHandler = (place: IPlace) => {
    console.log("click", place.title);

    if (isVisible) {
      togglePreview(false);
      SetSelectedPlace(null);
      SetIsVisible(false);
    }

    if (selectedPlace?.title !== place.title) {
      setTimeout(() => {
        showPlace(place);
      }, 400);
    }
  };

  const showPlace = (place: IPlace) => {
    SetSelectedPlace(place);
    togglePreview(true);
  };

  return (
    <MapContainer
      className="h-[calc(100vh-116px)] rounded-lg relative z-0"
      // scrollWheelZoom={false}
      center={defaultPosition}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place: IPlace) => (
        <Marker
          key={place.title}
          position={place.position}
          eventHandlers={{ click: () => markerClickHandler(place) }}
          icon={ICON}
        >
          <Tooltip>{place.title}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PlacesMap;
