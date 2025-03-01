import { FC } from "react";
import { ImageForm } from "@/app/_components";
import { updateImgAction } from "@/app/_actions/createHome";

interface IImageUpdatePage {
  params: { id: string };
}

const ImageUpdatePage: FC<IImageUpdatePage> = ({ params }) => (
  <>
    <h1>Update img (todo: layout, header)</h1>
    <ImageForm action={updateImgAction} hiddenFieldName="homeId" hiddenFieldValue={params.id} />
  </>
);

export default ImageUpdatePage;
