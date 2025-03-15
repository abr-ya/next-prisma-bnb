import { FC } from "react";
import { BottomBar, CounterWithComment } from "@/app/_components";
import { saveTextAction } from "@/app/_actions/createHome";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Header from "../Header";

interface IStep2Page {
  params: { id: string };
}

const Step2Page: FC<IStep2Page> = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <Header text="Step 2: Please describe your home as good as you can!" />
      <form action={saveTextAction}>
        <input type="hidden" name="homeId" value={id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name="title" type="text" required placeholder="Short and simple..." />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Descrption</Label>
            <Textarea name="description" placeholder="Please describe your home..." />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input name="price" type="number" required placeholder="Price per Night in USD" min={2} />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" />
          </div>

          {/* Counters! */}
          <CounterWithComment name="guest" title="Guests" comment="How many guests do you want?" />
          <CounterWithComment name="room" title="Rooms" comment="How many rooms do you have?" />
          <CounterWithComment name="bathroom" title="Bathrooms" comment="How many bathrooms do you have?" />
        </div>

        <BottomBar />
      </form>
    </>
  );
};

export default Step2Page;
