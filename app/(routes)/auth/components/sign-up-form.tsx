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
import { useSignUp } from "@/lib/hooks/use-sign-up";
import {
  type SignUpFormValues,
  SignUpSchema,
} from "@/lib/schemas/sign-up-schema";

export function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpFormValues) => {
    signUp(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 border-t border-border px-4 pt-10"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Full name *"
                  {...field}
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                />
              </FormControl>
              <FormMessage className="text-xs mt-2" />
            </FormItem>
          )}
        />

        {/* Email */}
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

        {/* Password */}
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

        <div className="space-y-4 pt-4">
          <Button
            type="submit"
            className="w-full font-light tracking-wide"
            disabled={isPending}
          >
            {isPending ? "CREATING..." : "CONTINUE"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="underline underline-offset-4 text-foreground hover:text-muted-foreground transition-colors"
            >
              Back to login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
