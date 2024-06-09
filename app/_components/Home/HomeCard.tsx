import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { IHome } from "@/app/_interfaces/home.interfaces";
import { useCountries } from "@/app/lib/getCountries";

interface IHomeCard {
  data: IHome;
}

const HomeCard: FC<IHomeCard> = ({ data: { id, description, country, imageSrc, price } }) => {
  const { getCountryByValue } = useCountries();
  const coData = getCountryByValue(country);

  // todo: Server from ENV!
  return (
    <div className="flex flex-col">
      <Link href={`/home/${id}`}>
        <div className="relative h-72">
          <Image
            src={`https://flxqnzydzcxbchixsgnl.supabase.co/storage/v1/object/public/next-bnb-24/${imageSrc}`}
            alt="Image of House"
            fill
            className="rounded-lg h-full object-cover"
          />
        </div>

        <h3 className="font-medium text-base mt-2">
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
