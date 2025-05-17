import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form } from "@/components/index";
import { IEditorForm, workExperienceSchema, WorkExperienceValues } from "@/zod/resume.schema";
import WorkExperienceItem from "./WorkExperienceItem";
import { useEffect } from "react";

const Step3WorkExperienceForm = ({ resumeData, setResumeData }: IEditorForm) => {
  const formProps = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: { workExperiences: resumeData.workExperiences || [] },
  });

  const { trigger, watch, control } = formProps;

  const workExperiences = watch("workExperiences");

  useEffect(() => {
    const asyncValidationAndSave = async () => {
      const isValid = await trigger();
      const newExperiences = (workExperiences || []).slice(0);
      console.log(newExperiences);
      // @ts-expect-error prev?!
      if (isValid) setResumeData((prev) => ({ ...prev, workExperiences: newExperiences }));
    };
    asyncValidationAndSave();
  }, [workExperiences, setResumeData, trigger]);

  const { fields, append, remove } = useFieldArray({ control, name: "workExperiences" });
  const addButtonHandler = () => append({ position: "", company: "", startDate: "", endDate: "", description: "" });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work experience</h2>
        <p className="text-sm text-muted-foreground">Add as many work experiences as you like.</p>
      </div>
      <Form {...formProps}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceItem id={field.id} key={field.id} index={index} form={formProps} remove={remove} />
          ))}
          <div className="flex justify-center">
            <Button type="button" onClick={addButtonHandler}>
              Add work experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step3WorkExperienceForm;
