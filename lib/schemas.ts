import { z } from "zod";

export const createLinkSchema = z.object({
  url: z.url({ protocol: /^https?$/ })
});