import "@/app/globals.css";

import Header from "@/components/header";
import Providers from "@/components/providers";
import { env } from "@/config/env";
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
      {env.NODE_ENV === "development" && (
        <head>
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        </head>
      )}
      <body className="font-outfit antialiased">
        <Providers>
          <Header />
          <main className="pt-[64px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
