"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { ResumeValuesType } from "@/zod/resume.schema";

import {
  EditorBreadcrumbs,
  EditorFooter,
  EditorHeader,
  ResumeForm,
  ResumePreview,
  ResumeStyling,
} from "./_components/index";
import { steps } from "./steps";

const ClientResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const goToStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const [resumeData, setResumeData] = useState<ResumeValuesType>({ title: "" });

  return (
    <div className="flex grow flex-col">
      <EditorHeader />
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2">
            <EditorBreadcrumbs currentStep={currentStep} goToStep={goToStep} />
            <ResumeForm stepKey={currentStep} resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          <div className="grow md:border-r" />
          <div className="group relative hidden w-full md:flex md:w-1/2">
            <ResumeStyling data={resumeData} setData={setResumeData} />
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>
      <EditorFooter currentStep={currentStep} goToStep={goToStep} />
    </div>
  );
};

export default ClientResumeEditor;
