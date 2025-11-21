import { z } from "zod";

export const paginatedMetaSchema = z.object({
  totalItems: z.number().int().nonnegative(),
  itemCount: z.number().int().nonnegative(),
  itemsPerPage: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  currentPage: z.number().int().nonnegative(),
});

export const createPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: paginatedMetaSchema,
  });

export type Paginated<T> = {
  data: T[];
  meta: z.infer<typeof paginatedMetaSchema>;
};
