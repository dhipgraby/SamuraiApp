"use server";
import { AUTH_URL } from "../constants";
import axios from "axios";
import { handleServerError } from "../server-handler";

export const newVerification = async (token: string) => {

  try {
    const response = await axios.get(`${AUTH_URL}auth/verify?token=${token}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }

};
