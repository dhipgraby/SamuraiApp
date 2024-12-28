"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button disabled={isLoading} type="submit" variant={"primary"} className="w-full">
      {isLoading ? <Loading size={16} /> : "Next step"}
    </Button>
  );
};

export default SubmitButton;
