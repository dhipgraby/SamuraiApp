"use server";

import * as z from "zod";
import axios from "axios";
import { ContractingPartySchema } from "@/schemas/zod/business-zod-schema";
import { BUSINESS_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const updateContractingParty = async (values: z.infer<typeof ContractingPartySchema>, token: string) => {

  try {
    const validatedFields = ContractingPartySchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const response = await axios.post(`${BUSINESS_KYC_URL}update-contracting-party`,
      { ...values, contractingTicks: JSON.stringify(values.contractingTicks) },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};
