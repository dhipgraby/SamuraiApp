"use server";

import axios from "axios";
import { USERS_API } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const getDeposits = async (
  page: number = 1,
  limit: number = 10,
  filters: {
    id?: number,
    startDate?: string,
    endDate?: string,
    startAmount?: number,
    endAmount?: number,
    depositStatus?: number | string,
    Account?: string,
    orderBy?: "desc" | "asc",
  } = {},
  token: string,
) => {
  try {

    const response = await axios.get(`${USERS_API}deposits/all`,
      {
        params: {
          page,
          limit,
          id: filters.id,
          startDate: filters.startDate,
          endDate: filters.endDate,
          startAmount: filters.startAmount,
          endAmount: filters.endAmount,
          depositStatus: filters.depositStatus !== "-1" ? filters.depositStatus : undefined,
          Account: filters.Account,
          orderBy: filters.orderBy || "desc"
        },
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};
