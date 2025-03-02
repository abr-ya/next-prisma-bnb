import { FC } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "..";

interface IImageForm {
  action: (formData: FormData) => Promise<never>;
  hiddenFieldName: string;
  hiddenFieldValue: string;
}

const ImageForm: FC<IImageForm> = ({ action, hiddenFieldName, hiddenFieldValue }) => (
  <form action={action}>
    <input type="hidden" name={hiddenFieldName} value={hiddenFieldValue} />
    <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-12">
      <div className="flex flex-col gap-y-2">
        <Label>Image</Label>
        <Input name="image" type="file" />
      </div>
    </div>

    <div className="mx-auto w-3/5">
      <SubmitButton title="Upload Image" />
    </div>
  </form>
);

export default ImageForm;
