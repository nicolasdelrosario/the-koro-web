import NotFound from "@/app/components/not-found";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page not available"
      description="There are no results for your search, do not hesitate to contact our customer service by email or by phone."
      showBackButton={false}
    />
  );
}
