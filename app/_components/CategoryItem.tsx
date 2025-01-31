import { FC } from "react";
import Image from "next/image";

import { categories } from "../_tempData/categories";

interface ICategoryItem {
  name: string;
}

const CategoryItem: FC<ICategoryItem> = ({ name }) => {
  const category = categories.find((item) => item.name === name);

  return (
    <div className="flex items-center">
      <Image src={category?.imageUrl as string} alt="Category icon" width={44} height={44} />

      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
