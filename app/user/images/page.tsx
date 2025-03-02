import { redirect } from "next/navigation";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getUserImages, uploadUserImageAction } from "@/app/_actions/images";
import { ImageForm, PageSection } from "@/app/_components";
import { IMG_STORAGE } from "@/app/constants";

const MyImages = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");

  const data = await getUserImages(user.id);

  return (
    <PageSection title="My Images">
      <p>{JSON.stringify(data)}</p>
      <div className="flex flex-wrap gap-x-[4%]">
        {data.map((img) => (
          <div className="w-[22%] my-4 p-2 relative h-[150px]" key={img.id}>
            <Image
              src={`${IMG_STORAGE}/${img.url}`}
              className="rounded-lg h-full object-cover"
              alt={`Img title or id: ${img.title || img.id}`}
              fill
            />
            {img.id}
          </div>
        ))}
      </div>

      <h2>Add one more img...</h2>
      <ImageForm action={uploadUserImageAction} hiddenFieldName="userId" hiddenFieldValue={user.id} />
    </PageSection>
  );
};

export default MyImages;
