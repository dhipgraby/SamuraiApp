"use server";

import * as z from "zod";
import axios from "axios";
import { PersonalInfoSchema } from "@/schemas/zod/individual-zod-schema";
import { INDIVIDUAL_KYC_URL } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const updatePersonalInfo = async (values: z.infer<typeof PersonalInfoSchema>, token: string) => {
  try {
    const validatedFields = PersonalInfoSchema.safeParse(values);
    if (!validatedFields.success) {
      return { message: "Invalid fields!", status: 400 };
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      politicallyExposed
    } = validatedFields.data;

    const response = await axios.post(`${INDIVIDUAL_KYC_URL}personal-info`,
      {
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        politicallyExposed
      },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};