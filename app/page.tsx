import { CategoryFilter, HomeList } from "./_components";
import { getHomes } from "./_actions/getHome";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const homes = await getHomes({ userId: user?.id });
  console.log(homes);

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <CategoryFilter />
      <HomeList data={homes} />
    </div>
  );
};

export default Home;
