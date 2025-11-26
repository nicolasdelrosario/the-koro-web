import { constructMetadata } from "@/lib/utils/construct-metadata";

export const metadata = constructMetadata({
  title: "Account | The Koro",
  description: "Manage your account details",
  keywords: ["Account", "Profile", "Settings"],
});

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
