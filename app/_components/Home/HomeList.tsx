import { FC } from "react";
import { IHome } from "@/app/_interfaces/home.interfaces";
import HomeCard from "./HomeCard";
import EmptyResult from "../EmptyResult";

interface IHomeList {
  data: IHome[];
  emptyTitle?: string;
  emptyComment?: string;
}

const HomeList: FC<IHomeList> = ({ data, emptyTitle, emptyComment }) => {
  console.log("HomeList data", data);

  if (data.length === 0)
    return <EmptyResult title={emptyTitle || "EmptyResult"} description={emptyComment || "DefaulComment"} />;

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => (
        <HomeCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default HomeList;
