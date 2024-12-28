"use server";

import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";

export const updateAuthorizedSignatures = async (formData: FormData, token: string) => {

  try {
    return await handleServerPost(`${BUSINESS_KYC_URL}update-authorized-signatures`, formData, token, false);
  } catch (error: any) {
    return await handleServerError(error);
  }
};