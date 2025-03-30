"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { ResumeValuesType } from "@/zod/resume.schema";

import { EditorBreadcrumbs, EditorFooter, EditorHeader, ResumeForm, ResumePreview } from "./_components/";
import { steps } from "./steps";

const ClientResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<ResumeValuesType>({ title: "" });

  return (
    <div className="flex grow flex-col">
      <EditorHeader />
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
            <EditorBreadcrumbs />
            <ResumeForm stepKey={currentStep} resumeData={resumeData} setResumeData={setResumeData} />
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
