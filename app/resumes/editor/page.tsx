import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";

import ClientResumeEditor from "./ClientResumeEditor";

interface IEditorPage {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = async ({ searchParams }: IEditorPage) => {
  const { resumeId } = await searchParams;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(resumeId, user.id);

  return <ClientResumeEditor />;
};

export default EditorPage;
