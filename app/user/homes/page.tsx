import { getUserHomes } from "@/app/_actions/getHome";
import { EmptyResult, HomeList } from "@/app/_components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";

const MyHomes = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = await getUserHomes(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">My Homes</h2>

      {data.length === 0 ? (
        <EmptyResult
          description="Please list a home on bnb so that you can see it right here"
          title="You don't have any Homes listed"
        />
      ) : (
        <HomeList data={data} />
      )}
    </section>
  );
};

export default MyHomes;
