import { FC } from "react";
import Image from "next/image";
import { IMG_STORAGE } from "@/app/constants";
import { IImageData } from "@/app/_interfaces/home.interfaces";

interface IImagesBlock {
  mainImg: string;
  images: IImageData[];
}

const ImagesBlock: FC<IImagesBlock> = ({ mainImg, images }) => {
  const hasRightBlock = images.length >= 4;
  console.log(hasRightBlock);

  const mainImage = (
    <Image
      alt="Image of Home"
      src={`${IMG_STORAGE}/${mainImg}`}
      fill
      className="rounded-lg h-full object-cover w-full"
      placeholder="blur"
      blurDataURL={`${IMG_STORAGE}/${mainImg}`}
    />
  );

  const imgCards = images.map((imgItem) => (
    <div key={imgItem.id} className="flex w-full h-[240px] relative">
      <Image
        alt="Image of Home"
        src={`${IMG_STORAGE}/${imgItem.url}`}
        className="rounded-lg h-full object-cover w-full"
        placeholder="blur"
        blurDataURL={`${IMG_STORAGE}/${imgItem.url}`}
        fill
      />
    </div>
  ));

  return (
    <div className="relative h-[480px]">
      {hasRightBlock ? (
        <div className="flex h-[100%] gap-1">
          <div className="relative h-[100%] flex w-1/2">{mainImage}</div>
          <div className="flex flex-col w-1/4 gap-1">
            <>{imgCards[0]}</>
            <>{imgCards[1]}</>
          </div>
          <div className="flex flex-col w-1/4 gap-1">
            <>{imgCards[2]}</>
            <>{imgCards[3]}</>
          </div>
        </div>
      ) : (
        mainImage
      )}
    </div>
  );
};

export default ImagesBlock;
