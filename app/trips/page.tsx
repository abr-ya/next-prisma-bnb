import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Heading, SkeletonList, TripList } from "../_components";
import { getTripsByUser } from "../_actions/getTrips";
import { Suspense } from "react";

// to use Suspense on Wrapper!
const GetItemsContainer = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) return <div>Please log in to see your trips</div>;

  const trips = await getTripsByUser(user.id);

  return <TripList trips={trips} />;
};

const TripsHomePage = () => (
  <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5">
    <Heading title="Trips Page" />
    <Suspense fallback={<SkeletonList />}>
      <GetItemsContainer />
    </Suspense>
  </div>
);

export default TripsHomePage;
