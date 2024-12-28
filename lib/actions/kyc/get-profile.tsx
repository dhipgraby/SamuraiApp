"use server";

import axios from "axios";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const getProfile = async (token: string, profileType: string) => {

  const profileUrl = profileType === "kyc-profile" ? "profile" : "personal-info";

  try {
    const response = await axios.get(`${INDIVIDUAL_KYC_URL}${profileUrl}`,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};