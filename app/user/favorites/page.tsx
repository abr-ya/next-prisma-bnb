import { getLikedByUser } from "@/app/_actions/getHome";
import { HomeList, PageSection } from "@/app/_components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";

const MyFavorites = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = (await getLikedByUser(user.id)).map((el) => ({ ...el.Home, Favorite: true })).filter((el) => !!el);

  console.log(data);

  return (
    <PageSection title="My Favorites">
      <HomeList
        // @ts-expect-error data.key ?? mb add check for params in Card?
        data={data}
        emptyComment="Just like something!.."
        emptyTitle="You haven't liked homes"
      />
    </PageSection>
  );
};

export default MyFavorites;
