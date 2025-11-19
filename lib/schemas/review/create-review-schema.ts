import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number("Rating must be a number")
    .min(0, "Rating must be a non-negative number")
    .max(5, "Rating must be between 0 and 5"),

  comment: z.string("Comment must be a string").min(1, "Comment is required"),

  productId: z.uuid(),
  orderId: z.uuid().optional(),
});

export type CreateReview = z.infer<typeof createReviewSchema>;
