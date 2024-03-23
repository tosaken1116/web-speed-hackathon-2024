import { z } from 'zod';
const Type = ['company', 'contact', 'overview', 'question', 'term'] as const;
export const GetInfoRequestParamsSchema = z.object({
  type: z.enum(Type),
});

export type GetInfoRequestParams = z.infer<typeof GetInfoRequestParamsSchema>;
