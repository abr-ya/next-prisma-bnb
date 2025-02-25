import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { getHomeDetail } from "@/app/_actions/getHome";
import { Avatar, CategoryItem } from "@/app/_components";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import { IMG_STORAGE } from "@/app/constants";
import HomeOnMap from "./_components/HomeOnMap";
import BookingForm from "./_components/BookingForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import EditPinClientModal from "./_components/EditPinClientModal";

interface IHomeDetailPage {
  params: { id: string };
}

const HomeDetailPage: FC<IHomeDetailPage> = async ({ params: { id } }) => {
  const data = await getHomeDetail(id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  console.log(data);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const renderImgBlock = (imageSrc: string | null | undefined) =>
    imageSrc ? (
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`${IMG_STORAGE}/${imageSrc}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
    ) : (
      // todo: Add User check!
      <Link href={`${id}/edit/img`} className="w-full text-green-600">
        Add Image (to do: button?)
      </Link>
    );

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

      {renderImgBlock(data?.imageSrc)}

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guestCount} Guests</p> * <p>{data?.roomCount} Bedrooms</p> * {data?.bathroomCount} Bathrooms
          </div>
          <div className="flex items-center mt-6">
            <Avatar img={data?.User?.profileImage} />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since ???</p>
            </div>
          </div>

          <Separator className="my-5" />
          {data?.category ? <CategoryItem name={data?.category} /> : null}

          <Separator className="my-5" />
          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-5" />
          {/* Map */}
          <HomeOnMap pintLat={data?.pinLat || 0} pinLon={data?.pinLon || 0} />
          {/* Edit Map Modal Init Client ?! */}
          {/* todo: Add isHost Check and real id */}
          <EditPinClientModal />
        </div>
        {/* Reservation Form */}
        <BookingForm booked={data?.Reservation || []} homeId={id} userId={user?.id} />
      </div>
    </div>
  );
};

export default HomeDetailPage;
