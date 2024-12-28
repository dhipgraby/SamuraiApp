"use server";

import * as z from "zod";
import axios from "axios";
import { NewPasswordSchema } from "@/schemas/zod/auth-zod-schema";
import { AUTH_URL } from "../constants";

export const resetPassword = async (
  values: z.infer<typeof NewPasswordSchema>
) => {

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { token, password, confirmPassword } = validatedFields.data;

  try {
    const response = await axios.post(`${AUTH_URL}auth/verify-password-email`,
      { token, password, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    return response.data;

  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      return { message: "Connection refused. Please try again later or contact support.", status: 400 };
    }

    if (error.response.data.status !== 200) {
      if (error.response.data.status === 404 && error.response.data.error) return { message: error.response.data.error, status: 400 };
      return { message: error.response.data.message, status: 400 };
    }
    return { message: error, status: 400 };
  }
};
