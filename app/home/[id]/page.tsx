import { FC } from "react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Separator } from "@/components/ui/separator";
import { getHomeDetail } from "@/app/_actions/getHome";
import { Avatar, CategoryItem } from "@/app/_components";
import { BookingForm, CountryBlock, HomeOnMap, ImagesBlock } from "./_components";
import EditPinClientModal from "./_components/EditPinClientModal";
import { BlueRoundButton } from "@/app/_components/Buttons";
import ConnectImagesDialog from "@/app/_components/Dialogs/ConnectImagesDialog";
import { IImageData } from "@/app/_interfaces/home.interfaces";

interface IHomeDetailPage {
  params: Promise<{ id: string }>;
}

const HomeDetailPage: FC<IHomeDetailPage> = async ({ params }) => {
  const { id } = await params;
  const data = await getHomeDetail(id);

  console.log(data);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const renderImgBlock = (imageSrc: string | null | undefined) =>
    imageSrc ? (
      <ImagesBlock mainImg={imageSrc} images={(data?.images as IImageData[]).slice(0, 4)} />
    ) : (
      // todo: Add User check!
      <Link href={`${id}/edit/img`} className="w-full text-green-600">
        <BlueRoundButton label="Add Image" />
      </Link>
    );

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

      {renderImgBlock(data?.imageSrc)}

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <CountryBlock countryName={data?.country as string} />
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
          {/* todo: Add isHost Check */}
          <EditPinClientModal initLat={data?.pinLat || 0} initLon={data?.pinLon || 0} homeId={id} />
        </div>
        <div className="w-1/3">
          {/* Reservation Form */}
          <BookingForm booked={data?.Reservation || []} homeId={id} userId={user?.id} />

          <Separator className="my-5" />
          {/* Image Control */}
          <ul>{data?.images.map((el) => <li key={el.url}>{el.url}</li>)}</ul>
          <ConnectImagesDialog homeId={id} userId={user?.id} />
        </div>
      </div>
    </div>
  );
};

export default HomeDetailPage;
