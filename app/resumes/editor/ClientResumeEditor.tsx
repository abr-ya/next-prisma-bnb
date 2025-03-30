"use client";

import { EditorBreadcrumbs, EditorFooter, EditorHeader, ResumeForm, ResumePreview } from "./_components/";

const ClientResumeEditor = () => {
  return (
    <div className="flex grow flex-col">
      <EditorHeader />
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
            <EditorBreadcrumbs />
            <ResumeForm />
          </div>
          <div className="grow md:border-r" />
          <div className="group relative hidden w-full md:flex md:w-1/2">
            <ResumePreview />
          </div>
        </div>
      </main>
      <EditorFooter />
    </div>
  );
};

export default ClientResumeEditor;
