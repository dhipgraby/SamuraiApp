"use server";

import { USERS_API } from "@/lib/constants";
import { handleServerError, handleServerPost } from "@/lib/server-handler";

export const solveReview = async (id: number, token: string) => {
  try {
    return await handleServerPost(`${USERS_API}user/solve-review`, { id }, token);
  } catch (error: any) {
    return await handleServerError(error);
  }
};