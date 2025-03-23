import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DateRangePicker, Heading, SubmitButton } from "@/app/_components";
import { createTrip } from "@/app/_actions/createTrip";

const NewTripPage: FC = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <form action={createTrip}>
      <input type="hidden" name="userId" value={user?.id} />
      <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5">
        <Heading title="Create New Trip" />
        <div className="flex flex-col gap-y-2">
          <Label>Title</Label>
          <Input name="title" type="text" required placeholder="Short and simple..." />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Descrption</Label>
          <Textarea name="description" placeholder="Please describe your home..." />
        </div>
        <div className="flex flex-col gap-y-2 w-[330px]">
          <Label>Descrption</Label>
          <DateRangePicker reservation={[]} />
        </div>
        <SubmitButton title="Create Trip" />
      </div>
    </form>
  );
};

export default NewTripPage;
