import { USERS_API } from "@/lib/constants";

export const getExportedVouchers = async (token: string) => {

  const ApiUrl = `${USERS_API}vouchers/export`;

  try {
    const response = await fetch(ApiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      return { message: "Failed to download vouchers export", status: 400 };
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error downloading vouchers export:", error);
    return { message: "Error downloading vouchers export:", status: 400 };
  }
};