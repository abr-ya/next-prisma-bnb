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
      <div className="flex flex-wrap gap-x-[4%]">
        {data.map((img) => (
          <div className="flex flex-col w-[22%] my-4 p-2" key={img.id}>
            <div className="relative h-[150px]">
              <Image
                src={`${IMG_STORAGE}/${img.url}`}
                className="rounded-lg h-full object-cover"
                alt={`Img title or id: ${img.title || img.id}`}
                fill
                sizes="25vw"
                placeholder="blur"
                blurDataURL={`${IMG_STORAGE}/${img.url}`}
              />
            </div>
            <div>{img.id}</div>
          </div>
        ))}
      </div>

      <h2>Add one more img...</h2>
      <ImageForm action={uploadUserImageAction} hiddenFieldName="userId" hiddenFieldValue={user.id} />
    </PageSection>
  );
};

export default MyImages;
