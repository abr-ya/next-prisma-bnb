import { FC } from "react";
import Link from "next/link";

import { IHome } from "@/app/_interfaces/home.interfaces";
import { useCountries } from "@/app/lib/getCountries";

interface IHomeCard {
  data: IHome;
}

const HomeCard: FC<IHomeCard> = ({ data: { id, description, country, price } }) => {
  const { getCountryByValue } = useCountries();
  const coData = getCountryByValue(country);

  return (
    <div className="flex flex-col">
      <Link href={`/home/${id}`} className="mt-2">
        <h3 className="font-medium text-base">
          {coData?.flag} {coData?.label} / {coData?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
};

export default HomeCard;
