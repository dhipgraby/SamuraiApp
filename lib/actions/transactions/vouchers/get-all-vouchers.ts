"use server";

import axios from "axios";
import { USERS_API } from "@/lib/constants";
import { handleServerError } from "@/lib/server-handler";

export const getVouchers = async (
  page: number = 1,
  limit: number = 10,
  filters: {
    email?: string;
    startDate?: string;
    endDate?: string;
    startFiatAmount?: number;
    endFiatAmount?: number;
    startCryptoAmount?: number;
    endCryptoAmount?: number;
    isRedeemed?: boolean;
    txId?: string;
  } = {},
  token: string
) => {
  try {
    const response = await axios.get(`${USERS_API}vouchers`, {
      params: {
        page,
        limit,
        email: filters.email,
        startDate: filters.startDate,
        endDate: filters.endDate,
        startFiatAmount: filters.startFiatAmount,
        endFiatAmount: filters.endFiatAmount,
        startCryptoAmount: filters.startCryptoAmount,
        endCryptoAmount: filters.endCryptoAmount,
        isRedeemed: filters.isRedeemed,
        txId: filters.txId
      },
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    return await handleServerError(error);
  }
};
