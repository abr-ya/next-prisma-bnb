import { FC } from "react";
import { BottomBar, SelectedCategory } from "@/app/_components";
import { saveCategoryAction } from "@/app/actions";

interface IStep1Page {
  params: { id: string };
}

const Step1Page: FC<IStep1Page> = ({ params }) => (
  <>
    <div className="w-3/5 mx-auto">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        Which of these best describe your Home?
      </h2>
    </div>

    <form action={saveCategoryAction}>
      <input type="hidden" name="homeId" value={params.id} />
      <SelectedCategory />
      <BottomBar />
    </form>
  </>
);

export default Step1Page;
