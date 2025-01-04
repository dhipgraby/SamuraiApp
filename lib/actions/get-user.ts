"use server";

import axios from "axios";
import { AUTH_URL, USERS_API } from "@/lib/constants";
import { isRedirectError } from "next/dist/client/components/redirect";
import { logout } from "./logout";
import { SignInSchema } from "@/schemas/zod/auth-zod-schema";
import { handleServerError } from "../server-handler";

export const getUser = async ({ token }: { token: string }) => {
  const validatedFields = SignInSchema.safeParse({ token });

  if (!validatedFields.success) return null;

  try {
    const response = await axios.get(`${AUTH_URL}auth/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.data.status !== 200) {
      logout();
    }

    return {
      name: response.data.name,
      email: response.data.email,
      rol: response.data.rol,
      userStatus: response.data.userStatus,
      isTwoFactorEnabled: response.data.isTwoFactorEnabled,
      accessToken: token
    };

  } catch (error: any) {
    if (error.message) console.error(error.message);

    if (isRedirectError(error)) {
      console.error(error);
    }

    if (axios.isAxiosError(error)) {
      const response = error.response;

      if (response && response.data.message === "Unauthorized" || response?.data.message === "USER NOT FOUND") await logout();
      if (response && response.data) {
        const { statusCode, message } = response.data;
        if (statusCode === 404 || statusCode === 403) {
          return { message: message, status: 400 };
        }
      }
      if (error.code === "ECONNREFUSED") {
        return { message: "Connection refused. Please try again later or contact support.", status: 400 };
      }
    }
  }
};

export const getSettings = async (token: string) => {
  try {
    const response = await axios.get(`${USERS_API}user/vendors-config`,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } });
    return response.data;

  } catch (error: any) {
    return await handleServerError(error);
  }
};