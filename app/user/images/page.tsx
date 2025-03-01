import { getUserImages } from "@/app/_actions/images";
import { PageSection } from "@/app/_components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";

const MyImages = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = await getUserImages(user.id);

  return (
    <PageSection title="My Images">
      <h2>Users images will be here soon...</h2>
      <p>{JSON.stringify(data)}</p>
    </PageSection>
  );
};

export default MyImages;
