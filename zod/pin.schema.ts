import { z } from "zod";

export const addPinToTripSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Enter a pin name")
    .max(200, "Pin name must be at most 200 characters"),
});

export type AddPinToTripValues = z.infer<typeof addPinToTripSchema>;
