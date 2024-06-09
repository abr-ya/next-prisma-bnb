import { getHomeDetail } from "@/app/_api/home";
import { FC } from "react";

interface IHomeDetailPage {
  params: { id: string };
}

const HomeDetailPage: FC<IHomeDetailPage> = async ({ params: { id } }) => {
  const data = await getHomeDetail(id);
  console.log(data);

  return (
    <div>
      <h1>HomeDetailPage</h1>
      <p>id: {id}</p>
      <p>title: {data?.title}</p>
    </div>
  );
};

export default HomeDetailPage;
