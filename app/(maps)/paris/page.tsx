import dynamic from "next/dynamic";
import { data } from "./data";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const loading = () => <Skeleton className="h-[calc(100vh-200px)] w-full" />;
  const LazyMap = dynamic(() => import("./components/PlacesMap"), { loading });

  return (
    <div>
      <h2>Paris Demo</h2>
      <LazyMap places={data} />
    </div>
  );
};

export default page;
