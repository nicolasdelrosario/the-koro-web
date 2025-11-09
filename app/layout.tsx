import "@/app/globals.css";

import Header from "@/app/components/header";
import Providers from "@/app/components/providers";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import { cormorant, outfit } from "./fonts";

export const metadata = constructMetadata({
  title: "The Koro",
  description: "E-commerce web application",
  keywords: ["E-commerce", "Shop", "Online"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased">
        <Providers>
          <Header />
          <main className="pt-[64px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
