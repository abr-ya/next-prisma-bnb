"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

interface IHomeOnMap {
  pintLat: number;
  pinLon: number;
  zoom?: number;
}

const HomeOnMap: FC<IHomeOnMap> = ({ pintLat, pinLon, zoom = 6 }) => {
  const loading = () => <Skeleton className="h-[200px] w-full" />;
  const LazyMapBox = dynamic(() => import("@/app/_components/Mapbox/MapWithDraggableMarker"), { loading });

  const init = { latitude: pintLat, longitude: pinLon, zoom };
  const pin = { lat: pintLat, lng: pinLon };

  return (
    <div className="h-[500px]">
      <LazyMapBox initView={init} pin={pin} isDisabled />
    </div>
  );
};

export default HomeOnMap;
