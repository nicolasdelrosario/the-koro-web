import z from "zod";

export const createProductSchema = z.object({
  title: z.string("Title must be a string").min(1, "Title is required"),

  description: z
    .string("Description must be a string")
    .min(1, "Description is required"),

  price: z
    .number("Price must be a number")
    .positive("Price must be a positive number")
    .refine(
      (n) => Number(n.toFixed(2)) === n,
      "Price must be a number with up to 2 decimal places",
    ),

  stock: z
    .number("Stock must be a number")
    .min(0, "Stock must be a non-negative number"),

  images: z
    .array(z.url("Each image must be a valid URL"), {
      message: "Images must be an array",
    })
    .min(1, "At least one image is required"),

  categoryId: z.uuid("Category must be a valid UUID"),
});
