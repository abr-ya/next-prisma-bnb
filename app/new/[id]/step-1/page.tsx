import { FC } from "react";
import { BottomBar, SelectedCategory } from "@/app/_components";
import { saveCategoryAction } from "@/app/_actions/createHome";
import Header from "../Header";

interface IStep1Page {
  params: { id: string };
}

const Step1Page: FC<IStep1Page> = ({ params }) => (
  <>
    <Header text="Step 1: Which of these best describe your Home?" />
    <form action={saveCategoryAction}>
      <input type="hidden" name="homeId" value={params.id} />
      <SelectedCategory />
      <BottomBar />
    </form>
  </>
);

export default Step1Page;
