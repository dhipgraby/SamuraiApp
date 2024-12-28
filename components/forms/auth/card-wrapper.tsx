"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel?: string;
  backButtonHref?: string;
  headerLabel?: string;
  target_blank?: boolean | undefined;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
  headerLabel,
  target_blank
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md m-auto">
      {(headerLabel) &&
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
      }
      <CardContent>
        {children}
      </CardContent>

      <CardFooter>
        {(backButtonLabel && backButtonHref) &&
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
            target_blank={target_blank}
          />
        }
      </CardFooter>
    </Card>
  );
};
