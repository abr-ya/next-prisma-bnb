import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserImages, uploadUserImageAction } from "@/app/_actions/images";
import { ImageForm, PageSection, SubmitButton } from "@/app/_components";
import { connectImagesAction } from "@/app/_actions/createHome";

const MyImages = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = await getUserImages(user.id);

  return (
    <PageSection title="My Images">
      <h2>Users images will be here soon...</h2>
      <p>{JSON.stringify(data)}</p>
      <form action={connectImagesAction}>
        <input type="hidden" name="homeId" value={"067fcd88-f291-4c27-8f49-ea9d7ac140aa"} />
        {data.map(({ id }) => (
          <div key={id}>
            <input type="checkbox" id={id} name="images" value={id} />
            <label htmlFor="scales">{id}</label>
          </div>
        ))}
        <SubmitButton title="Add Images to Home" />
      </form>

      <h2>Add one more img</h2>
      <ImageForm action={uploadUserImageAction} hiddenFieldName="userId" hiddenFieldValue={user.id} />
    </PageSection>
  );
};

export default MyImages;
