"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginInputs } from "@/schemas/zod/auth-zod-schema";
import { CardWrapper } from "./card-wrapper";
import { login } from "@/lib/actions/login";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLoginMutation } from "@/queries/user/profile-query";
import LoginFormulary from "./loging-formulary";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { setItem } = useLocalStorage("accessToken");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"error" | "info" | "warning">(
    "error"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { submitLoginMutation } = useLoginMutation();

  const onSubmit = async (values: LoginInputs) => {
    try {
      // Clear previous error message and set loading state
      setErrorMsg(null);
      setIsLoading(true);

      const payload = {
        identifier: values.identifier,
        password: values.password,
        code: values.code || undefined,
      };

      const loging = await submitLoginMutation.mutateAsync({
        setIsLoading,
        setErrorMsg,
        serverAction: async () => await login(payload),
      });

      const response = loging.serverResponse;

      if (response.status) {
        if (response.status === 202) {
          toast.info(
            "A new confirmation email has been sent. Please check your inbox and click the verification link."
          );
          setErrorType("info");
          setErrorMsg(
            "A new confirmation email has been sent. Please check your inbox and click the verification link."
          );
          setIsLoading(false);
          return;
        }

        if (response.status !== 200) {
          const errorMessage =
            response.message ||
            response.error ||
            "Something went wrong, try again or contact support.";
          setErrorMsg(errorMessage);
          setErrorType("warning");
          if (response.message === "Token is expired") {
            form.reset();
            setShowTwoFactor(false);
          }
          setIsLoading(false);
          return;
        }

        if (response.twofactor) {
          setShowTwoFactor(true);
          toast.info(response.message);
          setSuccessMsg(response.message);
          setIsLoading(false);
          return;
        }

        const accessToken = response.token;
        setItem(accessToken);
        toast.success("Successfully logged in! Redirecting...");
        setSuccessMsg("Successfully logged in!");
        setTimeout(() => {
          router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
        }, 2000);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log("error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (error.response.status === 202) {
          toast.info(
            "A new confirmation email has been sent. Please check your inbox and click the verification link."
          );
          setErrorType("info");
        } else {
          toast.error(errorMessage);
        }
        setErrorMsg(errorMessage);
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or contact support.";
        setErrorMsg(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="m-auto w-full mt-5">
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/signup"
        >
          <LoginFormulary
            form={form}
            onSubmit={onSubmit}
            showTwoFactor={showTwoFactor}
            errorMsg={errorMsg}
            errorType={errorType}
            successMsg={successMsg}
            isLoading={isLoading}
          />
        </CardWrapper>
      </div>
    </>
  );
};

export default LoginForm;
