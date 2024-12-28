"use server";

import * as z from "zod";
import axios from "axios";
import { BusinessCompanyInfoSchema } from "@/schemas/zod/business-zod-schema";
import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const updateCompanyInfo = async (values: z.infer<typeof BusinessCompanyInfoSchema>, token: string) => {

  try {
    const validatedFields = BusinessCompanyInfoSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const response = await axios.post(`${BUSINESS_KYC_URL}update-company-info`,
      values,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};
