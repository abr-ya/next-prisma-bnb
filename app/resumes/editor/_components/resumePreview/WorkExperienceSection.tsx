import { ResumeValuesType } from "@/zod/resume.schema";

interface IPersonalInfoHeader {
  data: ResumeValuesType;
}

const WorkExperienceSection = ({ data: { workExperiences, colorHex } }: IPersonalInfoHeader) => {
  const workExperiencesNotEmpty = workExperiences?.filter((exp) => Object.values(exp).filter(Boolean).length > 0);
  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold" style={{ color: colorHex }}>
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {/* todo: Date Formats */}
                  {exp.startDate} - {exp.endDate ? exp.endDate : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkExperienceSection;
