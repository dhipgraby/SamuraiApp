"use server";

import axios from "axios";
import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const getBusiness = async (token: string, profileUrl: string) => {
  try {
    const response = await axios.get(`${BUSINESS_KYC_URL}${profileUrl}`,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};