"use server";

import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerPost, handleServerError } from "@/lib/server-handler";

export const uploadId = async (formData: FormData, token: string) => {
  try {
    return await handleServerPost(`${INDIVIDUAL_KYC_URL}upload-id`, formData, token, false);
  } catch (error: any) {
    return await handleServerError(error);
  }
};