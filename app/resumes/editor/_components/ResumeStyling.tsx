import { ResumeValuesType } from "@/zod/resume.schema";

import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  data: ResumeValuesType;
  setData: (data: ResumeValuesType) => void;
}

const ResumeStyling = ({ data, setData }: ResumePreviewSectionProps) => (
  <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
    <ColorPicker color={data.colorHex} onChange={(color) => setData({ ...data, colorHex: color.hex })} />
    <BorderStyleButton borderStyle={data.borderStyle} onChange={(borderStyle) => setData({ ...data, borderStyle })} />
  </div>
);

export default ResumeStyling;
