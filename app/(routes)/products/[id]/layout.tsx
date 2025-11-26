export const dynamicParams = true;
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { env } from "@/config/env";
import { productSchema } from "@/lib/schemas/product/product-schema";
import { constructMetadata } from "@/lib/utils/construct-metadata";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;

    if (!id) {
      return constructMetadata({
        title: "Product | The Koro",
        description: "Explore product details at The Koro.",
      });
    }

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return constructMetadata({
        title: "Product not found | The Koro",
        description: "The requested product does not exist.",
      });
    }

    const json = await res.json();
    console.log(json);
    const product = productSchema.parse(json);

    const image = product.images?.[0] ?? "/favicon.svg";
    const keywords = [product.category.title, product.title, "Product"];

    return constructMetadata({
      title: `${product.title} | The Koro`,
      description: product.description,
      image,
      keywords,
    });
  } catch {
    return constructMetadata({
      title: "Product | The Koro",
      description: "Explore product details at The Koro.",
    });
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
