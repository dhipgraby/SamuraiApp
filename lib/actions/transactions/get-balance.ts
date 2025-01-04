"use server";

import axios from "axios";
import { USERS_API } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const getBalance = async (token: string) => {
  try {
    const response = await axios.get(`${USERS_API}user/get-balance`,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};