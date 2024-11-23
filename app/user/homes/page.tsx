import { getUserHomes } from "@/app/_actions/getHome";
import { HomeList, PageSection } from "@/app/_components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";

const MyHomes = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = await getUserHomes(user.id);

  return (
    <PageSection title="My Homes">
      <HomeList
        data={data}
        emptyComment="Please list a home on bnb so that you can see it right here"
        emptyTitle="You don't have any Homes listed"
      />
    </PageSection>
  );
};

export default MyHomes;
