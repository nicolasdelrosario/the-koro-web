import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Login | The Koro",
  description: "E-commerce web application",
  keywords: ["E-commerce", "Shop", "Online"],
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
