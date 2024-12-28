"use server";

import * as z from "zod";
import axios from "axios";
import { PhoneValidationSchema } from "@/schemas/zod/individual-zod-schema";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const phoneValidation = async (values: z.infer<typeof PhoneValidationSchema>, token: string) => {
  try {
    const validatedFields = PhoneValidationSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const { code } = validatedFields.data;
    const response = await axios.post(`${INDIVIDUAL_KYC_URL}verify-phone`,
      { code },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    handleServerError(error);
  }
};