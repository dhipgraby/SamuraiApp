"use server";

import * as z from "zod";
import { SignUpSchema } from "@/schemas/zod/auth-zod-schema";
import { AUTH_URL } from "../constants";
import axios from "axios";
import { handleServerError } from "../server-handler";

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const response = await axios.post(`${AUTH_URL}auth/signup`, { username, email, password }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error: any) {
    return await handleServerError(error);
  }
};
