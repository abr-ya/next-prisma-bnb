import { getBookedByUser } from "@/app/_actions/getHome";
import { HomeList, PageSection, SkeletonList } from "@/app/_components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { IBookedHome } from "@/app/_interfaces/home.interfaces";

import { redirect } from "next/navigation";
import { Suspense } from "react";

const MyBookingsList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  // todo: are we really need Favorite as Array?!
  const data = (await getBookedByUser(user.id)).map(
    (el) => ({ ...el.Home, Favorite: [], bookId: el.id, from: el.startDate, to: el.endDate }) as IBookedHome,
  );

  console.log(data);

  return (
    <HomeList
      currentPath="/user/bookings"
      data={data}
      emptyComment="Just booking something!.."
      emptyTitle="You haven't booked homes"
    />
  );
};

const MyBookingsPage = async () => (
  <PageSection title="My Bookings">
    <Suspense fallback={<SkeletonList />}>
      <MyBookingsList />
    </Suspense>
  </PageSection>
);

export default MyBookingsPage;
