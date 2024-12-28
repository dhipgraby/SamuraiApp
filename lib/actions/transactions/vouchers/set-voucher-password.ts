"use server";

import * as z from "zod";
import axios from "axios";
import { NewVoucherPasswordSchema } from "@/schemas/zod/auth-zod-schema";
import { USERS_API } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const setVoucherPassword = async (
  values: z.infer<typeof NewVoucherPasswordSchema>
) => {

  const validatedFields = NewVoucherPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword, code } = validatedFields.data;

  try {
    const response = await axios.post(`${USERS_API}public/vouchers/set-voucher-password`,
      { password, confirmPassword, code },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};
