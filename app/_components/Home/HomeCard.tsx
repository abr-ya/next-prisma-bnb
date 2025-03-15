import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { IBookedHome, IHome } from "@/app/_interfaces/home.interfaces";
import { useCountries } from "@/app/lib/getCountries";
import { IMG_STORAGE } from "@/app/constants";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./Buttons";
import { addToFavoriteAction, DeleteFromFavoriteAction } from "@/app/_actions/likeActions";

interface IHomeCard {
  currentPath: string;
  data: IHome | IBookedHome;
  userId?: string;
}

const HomeCard: FC<IHomeCard> = ({
  currentPath,
  data: { id, description, country, imageSrc, price, Favorite, ...restData },
  userId,
}) => {
  const { getCountryByValue } = useCountries();
  const coData = getCountryByValue(country);
  const isLiked = Favorite.length > 0;

  let isBookingCard = false;
  let from;
  // let to;
  if ("from" in restData) {
    isBookingCard = true;
    from = restData.from.toDateString();
    // to = restData.to.toDateString();
  }

  const renderImgBlock = (imageSrc: string | null) =>
    imageSrc ? (
      <Image
        src={`${IMG_STORAGE}/${imageSrc}`}
        placeholder="blur"
        blurDataURL={`${IMG_STORAGE}/${imageSrc}`}
        alt="Image of House"
        className="rounded-lg h-full object-cover"
        fill
        sizes="(max-width: 1200px) 50vw, 33vw"
      />
    ) : (
      <>Img wasn&apos;t loaded yet...</>
    );

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        {renderImgBlock(imageSrc)}
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isLiked ? (
              <form action={DeleteFromFavoriteAction}>
                <input type="hidden" name="favoriteId" value={Favorite[0]?.id} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={currentPath} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavoriteAction}>
                <input type="hidden" name="homeId" value={id} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={currentPath} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${id}`}>
        <h3 className="font-medium text-base mt-2">
          {coData?.flag} {coData?.label} / {coData?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="pt-2 text-muted-foreground">
          {isBookingCard ? (
            <>
              <span className="font-medium text-black">from:</span> {from}
            </>
          ) : (
            <>
              <span className="font-medium text-black">${price}</span> Night
            </>
          )}
        </p>
        {/* <p className="pt-2 text-muted-foreground"></p> !to!? */}
      </Link>
    </div>
  );
};

export default HomeCard;
