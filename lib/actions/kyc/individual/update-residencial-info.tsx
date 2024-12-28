"use server";

import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerPost, handleServerError } from "@/lib/server-handler";

export const updateResidencialInfo = async (formData: FormData, token: string) => {
  try {
    return await handleServerPost(`${INDIVIDUAL_KYC_URL}upload-residence-proof`, formData, token, false);
  } catch (error: any) {
    return await handleServerError(error);
  }
};