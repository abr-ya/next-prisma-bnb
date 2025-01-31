import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { FC } from "react";

interface IHomeOnMap {
  pintLat: number;
  pinLon: number;
}

const HomeOnMap: FC<IHomeOnMap> = ({ pintLat, pinLon }) => {
  const LazyMap = dynamic(() => import("@/app/_components/DemoMap"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return <LazyMap latLang={[pintLat, pinLon]} />;
};

export default HomeOnMap;
