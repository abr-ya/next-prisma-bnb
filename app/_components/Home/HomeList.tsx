import { FC } from "react";
import { IHome } from "@/app/_interfaces/home.interfaces";
import HomeCard from "./HomeCard";

interface IHomeList {
  data: IHome[];
}

const HomeList: FC<IHomeList> = ({ data }) => {
  console.log(data);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => (
        <HomeCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default HomeList;
