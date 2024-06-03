import { BottomBar } from "@/app/_components";
import { saveTextAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface IStep2Page {
  params: { id: string };
}

const Step2Page: FC<IStep2Page> = ({ params }) => (
  <>
    <div className="w-3/5 mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">Step2: {params.id}</h2>
    </div>

    <form action={saveTextAction}>
      <input type="hidden" name="homeId" value={params.id} />
      <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
        <div className="flex flex-col gap-y-2">
          <Label>Title</Label>
          <Input name="title" type="text" required placeholder="Short and simple..." />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Descrption</Label>
          <Textarea name="description" required placeholder="Please describe your home..." />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input name="price" type="number" required placeholder="Price per Night in USD" min={10} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Image</Label>
          <Input name="image" type="file" required />
        </div>

        {/* Counters! */}
      </div>

      <BottomBar />
    </form>
  </>
);

export default Step2Page;
