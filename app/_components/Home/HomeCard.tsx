import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { IHome } from "@/app/_interfaces/home.interfaces";
import { useCountries } from "@/app/lib/getCountries";
import { IMG_STORAGE } from "@/app/constants";
import { Heart } from "lucide-react";

interface IHomeCard {
  data: IHome;
  userId?: string;
}

// todo: temp!!!
const AddToFavoriteButton = () => <Heart className="w-4 h-4" color="#E21C49" />;
const DelFromFavoriteButton = () => <Heart className="w-4 h-4 text-primary" fill="#E21C49" />;

const HomeCard: FC<IHomeCard> = ({ data: { id, description, country, imageSrc, price, Favorite }, userId }) => {
  const { getCountryByValue } = useCountries();
  const coData = getCountryByValue(country);
  const isLiked = Favorite.length > 0;

  const renderImgBlock = (imageSrc: string | null) =>
    imageSrc ? (
      <Image src={`${IMG_STORAGE}/${imageSrc}`} alt="Image of House" fill className="rounded-lg h-full object-cover" />
    ) : (
      <>.....</>
    );

  return (
    <div className="flex flex-col">
      <Link href={`/home/${id}`}>
        <div className="relative h-72">
          {renderImgBlock(imageSrc)}
          {userId && (
            <div className="z-10 absolute top-2 right-2">
              {isLiked ? <DelFromFavoriteButton /> : <AddToFavoriteButton />}
            </div>
          )}
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
