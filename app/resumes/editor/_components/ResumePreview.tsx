import { FC, useRef } from "react";

import { ResumeValuesType } from "@/zod/resume.schema";
import PersonalInfoHeader from "./resumePreview/PersonalInfoHeader";
import SummarySection from "./resumePreview/SummarySection";
import WorkExperienceSection from "./resumePreview/WorkExperienceSection";
import EducationSection from "./resumePreview/EducationSection";
import SkillsSection from "./resumePreview/SkillsSection";

interface IResumePreview {
  data: ResumeValuesType;
}

const ResumePreview: FC<IResumePreview> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
      <div className="max-w-2xl shadow-md aspect-[210/297] h-fit w-full bg-white text-black" ref={containerRef}>
        <div className="space-y-6 p-6" id="resumePreviewContent">
          <PersonalInfoHeader data={data} />
          <SummarySection data={data} />
          <WorkExperienceSection data={data} />
          <EducationSection data={data} />
          <SkillsSection data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
