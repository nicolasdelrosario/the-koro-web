import { SignInForm } from "@/app/(routes)/auth/components/sign-in-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <MaxWidthWrapper className="py-28 sm:py-36">
      <div className="max-w-lg mx-auto space-y-10">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-cormorant tracking-[0.15em] font-medium">
            Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account below.
          </p>
        </header>

        <SignInForm />
      </div>
    </MaxWidthWrapper>
  );
}
