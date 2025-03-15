"useClient";

import React, { FC } from "react";
import { useCountries } from "@/app/lib/getCountries";

interface ICountryBlock {
  countryName: string;
}

const CountryBlock: FC<ICountryBlock> = ({ countryName }) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(countryName);

  return (
    <h3 className="text-xl font-medium">
      {country?.flag} {country?.label} / {country?.region}
    </h3>
  );
};

export default CountryBlock;
