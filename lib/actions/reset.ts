"use server";

import * as z from "zod";
import axios from "axios";
import { ResetPassowrdSchema } from "@/schemas/zod/auth-zod-schema";
import { AUTH_URL } from "../constants";

export const resetPassword = async (
  values: z.infer<typeof ResetPassowrdSchema>
) => {

  const validatedFields = ResetPassowrdSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  try {
    const response = await axios.post(`${AUTH_URL}auth/reset-password`,
      { email },
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

    if (error.response.data.status !== 200 || error.response.data.statusCode !== 200) {
      if (error.response.data.statusCode === 404 && error.response.data.error) return { message: error.response.data.error, status: 400 };
      return { message: error.response.data.message, status: 400 };
    }
    return { message: error, status: 400 };
  }


};
