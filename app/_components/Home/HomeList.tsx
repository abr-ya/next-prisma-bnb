import { IHome } from "@/app/_interfaces/home.interfaces";
import { FC } from "react";

interface IHomeList {
  data: IHome[];
}

const HomeList: FC<IHomeList> = ({ data }) => {
  console.log(data);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default HomeList;
