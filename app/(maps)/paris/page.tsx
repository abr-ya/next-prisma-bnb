import { data } from "./data";
// import dynamic from "next/dynamic";
// import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  // const loading = () => <Skeleton className="h-[calc(100vh-200px)] w-full" />;
  // const LazyMap = dynamic(() => import("./components/PlacesMap"), { loading });
  console.log(data);

  return (
    <div>
      <h2>Paris Demo</h2>
      {/* <LazyMap places={data} /> */}
      This page is temporary switch off in Next 15.
    </div>
  );
};

export default page;
