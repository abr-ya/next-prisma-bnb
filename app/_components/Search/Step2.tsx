import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader } from "@/components/ui/card";
import { CounterWithComment, SubmitButton } from "..";

const Step2 = () => (
  <>
    <DialogHeader>
      <DialogTitle>Select all the info you need</DialogTitle>
      <DialogDescription>Pleae Choose a Country, so that what you want</DialogDescription>
    </DialogHeader>

    <Card>
      <CardHeader className="flex flex-col gap-y-5">
        <CounterWithComment name="guest" title="Guests" comment="How many guests do you want?" />
        <CounterWithComment name="room" title="Rooms" comment="How many rooms do you have?" />
        <CounterWithComment name="bathroom" title="Bathrooms" comment="How many bathrooms do you have?" />
      </CardHeader>
    </Card>

    <DialogFooter>
      <SubmitButton title="Search" />
    </DialogFooter>
  </>
);

export default Step2;
