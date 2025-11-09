import { z } from "zod";

export const productSchema = z.object({
  id: z.uuid("ID must be a valid UUID").optional(),
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(1, "Title is required"),

  description: z
    .string({
      message: "Description must be a string",
    })
    .min(1, "Description is required"),

  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive("Price must be a positive number")
    .refine(
      (v) => /^\d+(\.\d{1,2})?$/.test(String(v)),
      "Price must be a number with up to 2 decimal places",
    ),

  stock: z
    .number({
      message: "Stock must be a number",
    })
    .min(0, "Stock must be a non-negative number"),

  images: z
    .array(z.url("Each image must be a valid URL"))
    .nonempty("At least one image is required"),

  categoryId: z.uuid("Category must be a valid UUID").optional(),
});

export const productsSchema = z.array(productSchema);

export const createProductSchema = productSchema;

export const updateProductSchema = productSchema.partial();

export type Product = z.infer<typeof productSchema>;

export type CreateProduct = z.infer<typeof createProductSchema>;

export type UpdateProduct = z.infer<typeof updateProductSchema>;
