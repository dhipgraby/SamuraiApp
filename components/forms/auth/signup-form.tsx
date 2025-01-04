"use client";

import React, { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import {
  SignUpSchema,
  SignUpInputs,
  PSWD_FIELD_VALIDATION
} from "@/schemas/zod/auth-zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IconController from "@/components/icon-controller";
import Loading from "@/components/loading";
import { register } from "@/lib/actions/register";
import Link from "next/link";
import Logo from "@/components/logo";
import { CardWrapper } from "./card-wrapper";
import Alert from "@/components/ui/alert";

const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"error" | "info" | "warning">("error");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const form = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: SignUpInputs) => {
    if (signUpError !== null) setSignUpError(null);
    if (isLoading === false) setIsLoading(true);

    try {
      const response = await register(
        {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
      );

      console.log("component response: ", response);

      if (response.status) {
        if (response.status === 202) {
          toast.info("A new confirmation email has been sent. Please check your inbox and click the verification link.");
          setErrorType("info");
          setSignUpError("A new confirmation email has been sent. Please check your inbox and click the verification link.");
          setIsLoading(false);
          return;
        }

        if (response.status !== 200) {
          const errorMessage = response.message || response.error || "Something went wrong, try again or contact support.";
          setSignUpError(errorMessage);
          setErrorType("warning");
          setIsLoading(false);
          return;
        }

        toast.success("Successfully registered! We have sent a confirmation link to your email.");
        setSuccessMsg("Successfully registered! We have sent a confirmation link to your email.");
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log("error:", error);

      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        if (error.response.status === 202) {
          toast.info("A new confirmation email has been sent. Please check your inbox and click the verification link.");
          setErrorType("info");
        } else {
          toast.error(errorMessage);
        }
        setSignUpError(errorMessage);
      } else {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again or contact support.";
        setSignUpError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <Logo />
      <div className="m-auto w-full mt-5">
        <CardWrapper
          headerLabel="Register new account"
          backButtonLabel="Already have an account? Login"
          backButtonHref="/auth/login"
        >
          {isSuccess ?
            <div>
              <h1 className="text-2xl">
                Account created Successfully!
              </h1>
              <CheckCircle className="h-20 w-20 text-green-600 mt-10 mb-10 m-auto" />
              <p className="text-lg">
                We have sent a confirmation link to your email to verify your account.
              </p>
              <Link href="/auth/login">
                <Button className="w-full mt-10">
                  Go Login
                </Button>
              </Link>
            </div>
            :
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                {/* form fields */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="same as password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <PasswordRequirements password={form.watch("password")} confirmPassword={form.watch("confirmPassword")} />
                <Link href="/auth/login">Login to my account</Link>

                {/* submit btn */}
                <div className="w-full d-block">
                  {signUpError && <Alert message={signUpError} type={errorType} />}
                  {successMsg && <Alert message={successMsg} type={"success"} />}
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  <div className="flex items-center space-x-1">
                    {isLoading ? (
                      <>
                        <Loading size={16} />
                        <p>Creating account</p>
                      </>
                    ) : (
                      <>
                        <IconController icon="login" />
                        <p>Create account</p>
                      </>
                    )}
                  </div>
                </Button>
              </form>
            </Form>
          }
        </CardWrapper>
      </div>
    </>
  );
};

const PasswordRequirements = ({
  password,
  confirmPassword
}: {
  password: string;
  confirmPassword: string;
}) => {
  const pswd_valid_requirements = useMemo(() => {
    return {
      minLength: Boolean(password.length >= 8),
      specialChar: Boolean(PSWD_FIELD_VALIDATION.TEST.SPECIAL_CHAR(password)),
      number: Boolean(PSWD_FIELD_VALIDATION.TEST.NUMBER(password)),
      upperCase: Boolean(PSWD_FIELD_VALIDATION.TEST.UPPERCASE(password))
    };
  }, [password]);

  return (
    <div className="p-2 border rounded-lg text-sm">
      <div className="flex space-x-1 items-center">
        {pswd_valid_requirements.minLength ? (
          <IconController icon="circleCheck" />
        ) : (
          <IconController icon="circleClose" />
        )}
        <p>At least 8 characters long</p>
      </div>
      <div className="flex space-x-1 items-center">
        {pswd_valid_requirements.specialChar ? (
          <IconController icon="circleCheck" />
        ) : (
          <IconController icon="circleClose" />
        )}
        <p>At least 1 special character</p>
      </div>
      <div className="flex space-x-1 items-center">
        {pswd_valid_requirements.upperCase ? (
          <IconController icon="circleCheck" />
        ) : (
          <IconController icon="circleClose" />
        )}
        <p>At least 1 capital letter</p>
      </div>
      <div className="flex space-x-1 items-center">
        {pswd_valid_requirements.number ? (
          <IconController icon="circleCheck" />
        ) : (
          <IconController icon="circleClose" />
        )}
        <p>At least 1 number</p>
      </div>
      <div className="flex space-x-1 items-center">
        {password === confirmPassword ? (
          <IconController icon="circleCheck" />
        ) : (
          <IconController icon="circleClose" />
        )}
        <p>Confirm password must match</p>
      </div>
    </div>
  );
};

export default SignUpForm;