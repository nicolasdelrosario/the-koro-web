import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Products | The Koro",
  description: "Browse our latest products",
  keywords: ["Products", "Shop", "Catalog"],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
