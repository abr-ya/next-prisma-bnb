import Image from "next/image";
import { FC } from "react";

import { getUserImages } from "@/app/_actions/images";
import { SubmitButton } from "@/app/_components";
import { connectImagesAction } from "@/app/_actions/createHome";
import { IMG_STORAGE } from "@/app/constants";

interface IConnectImagesFormWithData {
  homeId: string;
  userId: string;
}

const ConnectImagesFormWithData: FC<IConnectImagesFormWithData> = async ({ homeId, userId }) => {
  const data = await getUserImages(userId);

  return (
    <form action={connectImagesAction}>
      <input type="hidden" name="homeId" value={homeId} />
      <div className="flex flex-wrap gap-x-[3%]">
        {data
          .filter((el) => !el.homeId)
          .map((img) => (
            <label className="cursor-pointer contents" key={img.id}>
              <div className="w-[31%] my-4 p-2 h-[150px] relative">
                <input className="absolute z-[100]" type="checkbox" id={img.id} name="images" value={img.id} />
                <Image
                  src={`${IMG_STORAGE}/${img.url}`}
                  placeholder="blur"
                  blurDataURL={`${IMG_STORAGE}/${img.url}`}
                  className="rounded-lg h-full object-cover"
                  alt={`Img title or id: ${img.title || img.id}`}
                  fill
                  sizes="(max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </label>
          ))}
      </div>
      {/* {data
        .filter((el) => !el.homeId)
        .map(({ id }) => (
          <div key={id}>
            <input type="checkbox" id={id} name="images" value={id} />
            <label htmlFor="scales">{id}</label>
          </div>
        ))} */}
      <SubmitButton title="Add Images to Home" />
    </form>
  );
};

export default ConnectImagesFormWithData;
