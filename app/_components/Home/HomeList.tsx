import { FC } from "react";
import { IBookedHome, IHome } from "@/app/_interfaces/home.interfaces";
import HomeCard from "./HomeCard";
import EmptyResult from "../EmptyResult";

interface IHomeList {
  currentPath: string;
  data: IHome[] | IBookedHome[];
  emptyTitle?: string;
  emptyComment?: string;
  userId?: string;
}

const HomeList: FC<IHomeList> = ({ currentPath, data, emptyTitle, emptyComment, userId }) => {
  console.log("HomeList data", data);

  if (data.length === 0)
    return <EmptyResult title={emptyTitle || "EmptyResult"} description={emptyComment || "DefaulComment"} />;

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {data.map((item) => {
        let key = item.id;
        if ("bookId" in item) key = item.bookId;

        return <HomeCard key={key} data={item} userId={userId} currentPath={currentPath} />;
      })}
    </div>
  );
};

export default HomeList;
