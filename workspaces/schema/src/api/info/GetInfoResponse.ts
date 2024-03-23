import { z } from 'zod';

export const GetInfoResponseSchema = z.object({
  text: z.string(),
});
export type GetInfoResponse = z.infer<typeof GetInfoResponseSchema>;
