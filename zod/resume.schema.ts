import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: z.string().trim().min(3, "minimum 3 symbols").or(z.literal("")),
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file: File | undefined) => !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine((file: File | undefined) => !file || file.size <= 1024 * 1024 * 1, "File must be less than 1MB"),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type WorkExperience = NonNullable<z.infer<typeof workExperienceSchema>["workExperiences"]>[number];

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  // todo
  // ...educationSchema.shape,
  // ...skillsSchema.shape,
  // ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValuesType = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export interface IEditorForm {
  resumeData: ResumeValuesType;
  setResumeData: (data: ResumeValuesType) => void;
}
