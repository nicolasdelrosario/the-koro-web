import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Register | The Koro",
  description: "E-commerce web application",
  keywords: ["E-commerce", "Shop", "Online"],
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
