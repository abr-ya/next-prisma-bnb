import { FC } from "react";
import { BottomBar } from "@/app/_components";
import { updateImgAction } from "@/app/_actions/createHome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IStep2Page {
  params: { id: string };
}

const Step2Page: FC<IStep2Page> = ({ params }) => (
  <>
    <h1>Update img (todo: layout, header)</h1>
    <form action={updateImgAction}>
      <input type="hidden" name="homeId" value={params.id} />
      <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
        <div className="flex flex-col gap-y-2">
          <Label>Image</Label>
          <Input name="image" type="file" />
        </div>
      </div>

      <BottomBar />
    </form>
  </>
);

export default Step2Page;
