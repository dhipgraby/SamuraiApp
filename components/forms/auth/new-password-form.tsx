"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas/zod/auth-zod-schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import Alert from "@/components/ui/alert";
import { resetPassword } from "@/lib/actions/reset-password";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (token) form.setValue("token", token);
    //eslint-disable-next-line
  }, []);

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    if (!token) {
      setError("Missing Auth Token");
      return;
    }

    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword({
        token: values.token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data.status === 200) {
          toast.success("Password changed! Redirecting to login...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      });
    });
  };

  if (!token) {
    return (
      <div className="container w-full text-center py-20">
        <CardWrapper
          headerLabel="Authentication error"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
        >
          <div className="m-auto w-fit">
            <Alert
              message="Missing reset token. There is not a valid token present in the url "
              type="warning"
            />
          </div>
        </CardWrapper>
      </div>
    );
  }

  return (
    <div className="m-auto w-full mt-20">
      <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Confirm password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Alert message={error} type="error" />
            <Alert message={success} type="success" />
            <Button
              disabled={isPending || success !== ""}
              type="submit"
              className="w-full"
            >
              Reset password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
