"use server";

import { USERS_API } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";
import { VendorsConfig } from "@/schemas/zod/user-zod-schema";

export const saveSettings = async (values: VendorsConfig, token: string) => {
  try {
    return await handleServerPost(`${USERS_API}user/edit-config`, values, token);
  } catch (error: any) {
    return await handleServerError(error);
  }
};