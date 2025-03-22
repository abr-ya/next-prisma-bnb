import { FC } from "react";
import Image from "next/image";
import { IMG_STORAGE } from "@/app/constants";

interface IImagesBlock {
  mainImg: string;
  images: string[];
}

const ImagesBlock: FC<IImagesBlock> = ({ mainImg, images }) => {
  console.log(images.length >= 4);

  return (
    <div className="relative h-[550px]">
      <Image
        alt="Image of Home"
        src={`${IMG_STORAGE}/${mainImg}`}
        fill
        className="rounded-lg h-full object-cover w-full"
        placeholder="blur"
        blurDataURL={`${IMG_STORAGE}/${mainImg}`}
      />
    </div>
  );
};

export default ImagesBlock;
