export const dynamicParams = true;
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { env } from "@/config/env";
import { categorySchema } from "@/lib/schemas/category/category-schema";
import { constructMetadata } from "@/lib/utils/construct-metadata";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;

    if (!id) {
      return constructMetadata({
        title: "Categories | The Koro",
        description: "Explore products by category at The Koro.",
      });
    }

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return constructMetadata({
        title: "Category not found | The Koro",
        description: "The requested category does not exist.",
      });
    }

    const json = await res.json();
    const category = categorySchema.parse(json);

    const keywords = [category.title, "Category", "Shop"];

    return constructMetadata({
      title: `${category.title} | The Koro`,
      description: category.description ?? "Explore products in this category.",
      keywords,
    });
  } catch {
    return constructMetadata({
      title: "Categories | The Koro",
      description: "Explore products by category at The Koro.",
    });
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
