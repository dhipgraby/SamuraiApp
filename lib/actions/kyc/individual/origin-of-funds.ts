"use server";

import * as z from "zod";
import axios from "axios";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";
import { OriginOfFundsSchema } from "@/schemas/zod/individual-zod-schema";

export const updateOriginOfFunds = async (values: z.infer<typeof OriginOfFundsSchema>, token: string) => {
  try {
    const validatedFields = OriginOfFundsSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const {
      employmentIncome,
      saleOfRealEstate,
      saleOfSharesOrInvestment,
      loan,
      saleOfCompany,
      inheritance,
      giftOrDonation,
      pensionFunds,
      gamblingWinnings,
      other,
      ultimateBeneficiary
    } = validatedFields.data;

    const response = await axios.post(`${INDIVIDUAL_KYC_URL}update-origin-of-funds`,
      {
        originOfFunds: [employmentIncome,
          saleOfRealEstate,
          saleOfSharesOrInvestment,
          loan,
          saleOfCompany,
          inheritance,
          giftOrDonation,
          pensionFunds,
          gamblingWinnings
        ],
        ultimateBeneficiary: (ultimateBeneficiary === "YES") ? true : false,
        otherFundsOrigin: other
      },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};