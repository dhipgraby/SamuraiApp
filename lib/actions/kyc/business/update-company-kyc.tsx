"use server";

import * as z from "zod";
import axios from "axios";
import { BusinessKycSchema } from "@/schemas/zod/business-zod-schema";
import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const updateBusinessKyc = async (values: z.infer<typeof BusinessKycSchema>, token: string) => {

  try {
    const validatedFields = BusinessKycSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const response = await axios.post(`${BUSINESS_KYC_URL}update-company-kyc`,
      {
        ...values,
        docimiliaryDeclaration: JSON.stringify(values.docimiliaryDeclaration),
        sourceOfFunds: JSON.stringify(values.sourceOfFunds)
      },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};
