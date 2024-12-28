"use server";

import * as z from "zod";
import axios from "axios";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { FinancialInfoSchema } from "@/schemas/zod/individual-zod-schema";
import { handleServerError } from "@/lib/server-handler";

export const updateFinancialInfo = async (values: z.infer<typeof FinancialInfoSchema>, token: string) => {
  try {
    const validatedFields = FinancialInfoSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const {
      estimatedAnnualIncomeEUR,
      estimatedNetWealthEUR,
      expectedTradingVolumePerYearEUR,
      industry,
      currentOccupation,
      activeInSectors
    } = validatedFields.data;

    const response = await axios.post(`${INDIVIDUAL_KYC_URL}update-financial-info`,
      {
        incomeEstimations: [estimatedAnnualIncomeEUR, estimatedNetWealthEUR, expectedTradingVolumePerYearEUR],
        industry,
        currentOccupation,
        activeInSectors: (activeInSectors === "YES") ? true : false
      },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};