import Image from "next/image";
import { FC } from "react";

interface IAvatar {
  img?: string | null;
}

const Avatar: FC<IAvatar> = ({ img }) => {
  return (
    <Image
      src={img || "/no-avatar.jpg"}
      className="rounded-full h-8 w-8 hidden md:block"
      alt="Image of the user"
      width={100}
      height={100}
    />
  );
};

export default Avatar;
