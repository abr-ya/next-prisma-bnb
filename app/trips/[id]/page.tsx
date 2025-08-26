import { getTripDetail } from "@/app/_actions/getTrips";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FC } from "react";

interface ITripDetailPage {
  params: Promise<{ id: string }>;
}

const TripDetailPage: FC<ITripDetailPage> = async ({ params }) => {
  const { id } = await params;
  const data = await getTripDetail(id);

  console.log(id);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isHost = user?.id === data?.admin?.id;
  console.log("user", user?.id, "isHost", isHost);

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">Trip detail: {data?.title}</h1>
      <p>{data?.description}</p>
    </div>
  );
};

export default TripDetailPage;
