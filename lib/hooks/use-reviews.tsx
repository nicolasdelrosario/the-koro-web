"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import type { CreateReview } from "@/lib/schemas/review/create-review-schema";
import { type Review, reviewSchema } from "@/lib/schemas/review/review-schema";
import { showError, showSuccess } from "@/lib/utils/toast";

export function useMyReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews", "me"],
    queryFn: async (): Promise<Review[]> => {
      const { data } = await api.get("/reviews/me");

      const parsed = data.map((review: Review) => reviewSchema.parse(review));
      return parsed;
    },
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReview) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("You must log in before submitting a review.");
        }
      }
      const { data } = await api.post("/reviews", payload);
      return reviewSchema.parse(data);
    },
    onSuccess: () => {
      showSuccess("Review submitted");
      queryClient.invalidateQueries({ queryKey: ["reviews", "me"] });
    },
    onError: (error) => {
      showError(error, "Failed to submit review");
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/reviews/${id}`);
      return data as { success?: boolean };
    },
    onSuccess: () => {
      showSuccess("Review deleted");
      queryClient.invalidateQueries({ queryKey: ["reviews", "me"] });
    },
    onError: (error) => {
      showError(error, "Failed to delete review");
    },
  });
}
