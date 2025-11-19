"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose } from "@/components/ui/sheet";
import { useSignIn } from "@/lib/hooks/use-sign-in";
import { type SignIn, signInSchema } from "@/lib/schemas/auth/sign-in-schema";

type Props = {
  onSuccess?: () => void;
  inSheet?: boolean;
};

export function SignInForm({ onSuccess, inSheet = false }: Props = {}) {
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (values: SignIn) => {
    signIn(values, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const CreateAccountButton = () => (
    <Button
      variant="outline"
      asChild
      className="w-full font-light tracking-wide"
    >
      <Link href="/auth/register">CREATE AN ACCOUNT</Link>
    </Button>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 border-t border-border px-4 pt-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email *"
                  {...field}
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                />
              </FormControl>
              <FormMessage className="text-xs mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password *"
                  {...field}
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                />
              </FormControl>
              <FormMessage className="text-xs mt-2" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full font-light tracking-wide"
            disabled={isPending}
          >
            {isPending ? "SIGNING IN..." : "CONTINUE"}
          </Button>

          {inSheet ? (
            <SheetClose asChild>
              <CreateAccountButton />
            </SheetClose>
          ) : (
            <CreateAccountButton />
          )}

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/auth/forgot-password"
              className="underline underline-offset-4 text-foreground hover:text-muted-foreground transition-colors"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
