import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Orders | The Koro",
  description: "Track your orders and details",
  keywords: ["Orders", "Purchases", "History"],
});

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
