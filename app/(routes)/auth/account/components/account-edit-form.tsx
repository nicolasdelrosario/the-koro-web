"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/lib/hooks/use-user";
import {
  type UpdateUser,
  updateUserSchema,
} from "@/lib/schemas/auth/update-user-schema";
import type { User } from "@/lib/schemas/auth/user-schema";

export default function AccountEditForm({ user }: { user: Partial<User> }) {
  const { mutate: update, isPending } = useUpdateUser();

    const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = (data: UpdateUser) => {
    update(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-t border-border pt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wide">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full Name*"
                    {...field}
                    disabled={isPending}
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-2" />
              </FormItem>
            )}
          />

          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wide">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email*"
                    {...field}
                    disabled={isPending}
                    className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs mt-2" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            className="font-light px-12 py-6 uppercase tracking-widest"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
