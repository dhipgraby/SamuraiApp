"use server";

import { USERS_API } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";
import { CreateVoucherSchema, CreateVoucherSchemaType } from "@/schemas/zod/transactions-zod-schema";

export const createVoucher = async (values: CreateVoucherSchemaType, token: string) => {

  const validatedFields = CreateVoucherSchema.safeParse(values);
  if (!validatedFields.success) {
    return { message: "Invalid fields!", status: 400 };
  }

  if (values.email === "") values.email = undefined;

  try {
    return await handleServerPost(`${USERS_API}vouchers`, values, token);
  } catch (error: any) {
    return await handleServerError(error);
  }
};
