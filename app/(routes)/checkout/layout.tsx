import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Checkout | The Koro",
  description: "Complete your purchase securely",
  keywords: ["Checkout", "Payment", "Order"],
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
