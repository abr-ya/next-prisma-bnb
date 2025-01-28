import { getLikedByUser } from "@/app/_actions/getHome";
import { HomeList, PageSection, SkeletonList } from "@/app/_components";
import { IHome } from "@/app/_interfaces/home.interfaces";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import { Suspense } from "react";

const MyFavoritesList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = (await getLikedByUser(user.id)).map((el) => ({ ...el.Home, Favorite: [], likeId: el.id }) as IHome);

  return (
    <HomeList
      currentPath="/user/favorites"
      data={data}
      emptyComment="Just like something!.."
      emptyTitle="You haven't liked homes"
    />
  );
};

const MyFavoritesPage = async () => (
  <PageSection title="My Favorites">
    <Suspense fallback={<SkeletonList />}>
      <MyFavoritesList />
    </Suspense>
  </PageSection>
);

export default MyFavoritesPage;
