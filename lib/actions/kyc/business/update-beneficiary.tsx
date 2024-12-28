"use server";

import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";

export const updateBeneficiary = async (formData: FormData, token: string) => {
  try {
    return await handleServerPost(`${BUSINESS_KYC_URL}update-beneficiary`, formData, token, false);

  } catch (error: any) {
    return await handleServerError(error);
  }
};
