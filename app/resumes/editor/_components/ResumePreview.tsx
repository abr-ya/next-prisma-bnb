import { FC, useRef } from "react";

import { ResumeValuesType } from "@/zod/resume.schema";
import PersonalInfoHeader from "./resumePreview/PersonalInfoHeader";
import SummarySection from "./resumePreview/SummarySection";
import WorkExperienceSection from "./resumePreview/WorkExperienceSection";
import EducationSection from "./resumePreview/EducationSection";
import SkillsSection from "./resumePreview/SkillsSection";
import useDimensions from "@/app/_hooks/useDimensions";
import { cn } from "@/lib/utils";

interface IResumePreview {
  data: ResumeValuesType;
}

const ResumePreview: FC<IResumePreview> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  return (
    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
      <div className="max-w-2xl shadow-md aspect-[210/297] h-fit w-full bg-white text-black" ref={containerRef}>
        {/* with zoom! */}
        <div className={cn("space-y-6 p-6", !width && "invisible")} style={{ zoom: (1 / 794) * width }}>
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
