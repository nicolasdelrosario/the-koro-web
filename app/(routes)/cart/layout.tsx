import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Cart | The Koro",
  description: "View and manage your cart",
  keywords: ["Cart", "Checkout", "Shopping"],
});

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
