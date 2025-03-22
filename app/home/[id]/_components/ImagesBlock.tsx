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

  const roundedMain = hasRightBlock ? "rounded-l-lg" : "rounded-lg";

  const mainImage = (
    <Image
      alt="Image of Home"
      src={`${IMG_STORAGE}/${mainImg}`}
      fill
      className={`h-full object-cover w-full ${roundedMain}`}
      placeholder="blur"
      blurDataURL={`${IMG_STORAGE}/${mainImg}`}
    />
  );

  const getRounded = (i: number) => {
    if (i === 2) return "rounded-tr-lg";
    if (i === 3) return "rounded-br-lg";

    return "rounded-none";
  };

  const imgCards = images.map(({ id, url }, i) => (
    <div key={id} className="flex w-full h-[240px] relative">
      <Image
        alt="Image of Home"
        src={`${IMG_STORAGE}/${url}`}
        className={`h-full object-cover w-full ${getRounded(i)}`}
        placeholder="blur"
        blurDataURL={`${IMG_STORAGE}/${url}`}
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
