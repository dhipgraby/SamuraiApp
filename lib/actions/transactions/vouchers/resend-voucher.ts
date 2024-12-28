"use server";

import { USERS_API } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";

export const resendVoucher = async (values: { voucherId: number }, token: string) => {
  try {
    return await handleServerPost(`${USERS_API}vouchers/resend`, values, token);
  } catch (error: any) {
    return await handleServerError(error);
  }
};
