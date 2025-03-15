import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { CategoryFilter, HomeList, SkeletonList } from "./_components";
import { getHomes } from "./_actions/getHome";
import { IHomeFilters } from "./_interfaces/home.interfaces";

// to use Suspense on Wrapper!
const GetItemsContainer = async (params: { searchParams: IHomeFilters }) => {
  const { searchParams } = await params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const homes = await getHomes({ userId: user?.id, searchParams });

  return <HomeList data={homes} userId={user?.id} currentPath="/" />;
};

const Home = async (params: { searchParams: IHomeFilters }) => {
  const { searchParams } = await params;

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <CategoryFilter />
      <Suspense fallback={<SkeletonList />}>
        <GetItemsContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home;
