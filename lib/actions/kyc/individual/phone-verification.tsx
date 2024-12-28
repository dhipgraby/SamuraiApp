"use server";

import * as z from "zod";
import axios from "axios";
import { PhoneNumberSchema } from "@/schemas/zod/individual-zod-schema";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const phoneVerification = async (values: z.infer<typeof PhoneNumberSchema>, token: string) => {
  try {
    const validatedFields = PhoneNumberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const { phoneDialCode, phoneNumber } = validatedFields.data;

    const response = await axios.post(`${INDIVIDUAL_KYC_URL}sms-verification`,
      { phoneNumber, phoneDialCode },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};