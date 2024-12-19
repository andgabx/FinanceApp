import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine(value => isMatch (value, "MM"), {
    message: "Mês inválido",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
