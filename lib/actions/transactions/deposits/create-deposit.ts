"use server";

import { USERS_API } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";
import { CreateDepositSchemaType } from "@/schemas/zod/transactions-zod-schema";

export const createDeposit = async (values: CreateDepositSchemaType, token: string) => {
  try {
    return await handleServerPost(`${USERS_API}deposits/create`, values, token);
  } catch (error: any) {
    return await handleServerError(error);
  }
};