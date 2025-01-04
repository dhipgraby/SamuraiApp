"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/lib/actions/new-verification";
import { CardWrapper } from "./card-wrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert";
import Logo from "@/components/logo";

export const NewVerificationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data: any) => {
        setSuccess(data.success);
        setError(data.error);
        if (data.status === 200) {
          toast.success("Email verified! Redirecting to login...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error, router]);


  useEffect(() => {
    const button = document.getElementById("hidden-button");
    const handleClick = () => {
      onSubmit();
      setButtonDisabled(true);
    };

    // Attach click event listener to the hidden button
    if (button) {
      button.addEventListener("click", handleClick);
      setTimeout(() => {
        button.click();
      }, 1000);
    }

    // Cleanup: Remove event listener when component unmounts
    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [onSubmit]);

  return (
    <>
      <Logo />
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && (
            <BeatLoader />
          )}
          <Alert message={success} type="success" />
          {!success && (
            <Alert message={error} type="error" />
          )}
        </div>

        {/* Hidden button to trigger submission */}
        <button id="hidden-button" style={{ display: "none" }} disabled={buttonDisabled} />
      </CardWrapper>
    </>
  );
};
