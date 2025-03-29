import { Metadata } from "next";
import CreateResumeButton from "./_components/CreateResumeButton";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ResumesPage = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton canCreate />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {0}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        <p>List of my resumes...</p>
        {
          // todo: resumeList, like
          // <ResumeItem key={resume.id} resume={resume} />
        }
      </div>
    </main>
  );
};

export default ResumesPage;
