"use client";

import dynamic from "next/dynamic";
import { data } from "../data";
import { Skeleton } from "@/components/ui/skeleton";

const ClientLazyMap = () => {
  const loading = () => <Skeleton className="h-[calc(100vh-200px)] w-full" />;
  const LazyMap = dynamic(() => import("./PlacesMap"), { ssr: false, loading });

  return <LazyMap places={data} />;
};

export default ClientLazyMap;
