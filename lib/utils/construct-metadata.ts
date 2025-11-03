import type { Metadata } from "next";
import { env } from "@/config/env";

interface ConstructMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string | string[];
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  robots?: string;
}

export const constructMetadata = ({
  title = env.NEXT_PUBLIC_APP_NAME ?? "The Koro",
  description = env.NEXT_PUBLIC_APP_DESCRIPTION ?? "E-commerce web application",
  image = "/favicon.ico",
  icons = "/favicon.ico",
  keywords = ["E-commerce", "Shop", "Online"],
  authors = [{ name: env.NEXT_PUBLIC_APP_NAME ?? "The Koro" }],
  robots = "index, follow",
}: ConstructMetadataOptions = {}): Metadata => {
  const baseUrl = env.NEXT_PUBLIC_APP_URL
    ? new URL(env.NEXT_PUBLIC_APP_URL)
    : undefined;

  return {
    title,
    description,
    keywords,
    authors,
    robots,
    metadataBase: baseUrl,
    icons,
    openGraph: {
      type: "website",
      locale: "es_PE",
      url: baseUrl?.origin,
      title,
      description,
      siteName: env.NEXT_PUBLIC_APP_NAME ?? "The Koro",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};
