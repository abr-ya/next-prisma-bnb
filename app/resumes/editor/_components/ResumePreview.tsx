import { FC, useRef } from "react";
import { cn } from "@/lib/utils";

import { ResumeValuesType } from "@/zod/resume.schema";
import useDimensions from "@/app/_hooks/useDimensions";

import PersonalInfoHeader from "./resumePreview/PersonalInfoHeader";
import SummarySection from "./resumePreview/SummarySection";
import WorkExperienceSection from "./resumePreview/WorkExperienceSection";
import EducationSection from "./resumePreview/EducationSection";
import SkillsSection from "./resumePreview/SkillsSection";

interface IResumePreview {
  data: ResumeValuesType;
}

const ResumePreview: FC<IResumePreview> = ({ data }) => {
  const PxIn210mm = 794;
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
      <div className="max-w-2xl shadow-md aspect-[210/297] h-fit w-full bg-white text-black" ref={containerRef}>
        {/* with zoom! */}
        <div className={cn("space-y-6 p-6", !width && "invisible")} style={{ zoom: (1 / PxIn210mm) * width }}>
          <PersonalInfoHeader data={data} />
          {/* todo: types! */}
          <SummarySection color={data.colorHex as string} summary={data.summary} />
          <WorkExperienceSection data={data} />
          <EducationSection data={data} />
          <SkillsSection data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
