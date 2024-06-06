"use client";

import { FC, useState } from "react";
import Header from "../Header";
import { BottomBar } from "@/app/_components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveCountryAction } from "@/app/actions";
import { useCountries } from "@/app/lib/getCountries";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

interface IStep3Page {
  params: { id: string };
}

const Step3Page: FC<IStep3Page> = ({ params }) => {
  const { getAllCountries, getCountryByValue } = useCountries();
  const [lat, setLat] = useState(52.5);
  const [lng, setLng] = useState(0);
  const [country, setCountry] = useState("");

  const loading = () => <Skeleton className="h-[50vh] w-full" />;
  const LazyMap = dynamic(() => import("@/app/_components/DemoMap"), { ssr: false, loading });

  const SelectHandler = (value: string) => {
    const latLng = getCountryByValue(value)?.latLang;
    if (latLng) {
      setLat(latLng[0]);
      setLng(latLng[1]);
    }
    setCountry(value);
  };

  return (
    <>
      <Header text="Step 3: Where is your Home located?" />

      <form action={saveCountryAction}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={country} />
        <input type="hidden" name="pinLat" value={lat} />
        <input type="hidden" name="pinLon" value={lng} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={SelectHandler}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap latLang={[lat, lng]} />
          <div>
            <p>
              lat: {lat}, long: {lng}
            </p>
          </div>
        </div>

        <BottomBar />
      </form>
    </>
  );
};

export default Step3Page;
