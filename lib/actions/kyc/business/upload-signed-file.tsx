"use server";

import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";

export const uploadSignedFile = async (formData: FormData, token: string) => {
  try {
    return await handleServerPost(`${BUSINESS_KYC_URL}upload-pdf`, formData, token, false);
  } catch (error: any) {
    return await handleServerError(error);
  }
};
