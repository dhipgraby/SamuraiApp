"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
  target_blank?: boolean | undefined
}

export const BackButton = ({
  href,
  label,
  target_blank
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="text-blue-600 font-normal w-full"
      size="sm"
      asChild
    >
      <Link href={href} target={target_blank ? "_blank" : "_self"}>
        {label}
      </Link>
    </Button>
  );
};
