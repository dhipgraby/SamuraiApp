import { USERS_API } from "@/lib/constants";

export const getExportedDeposits = async (token: string) => {

  const ApiUrl = `${USERS_API}deposits/export`;
  try {
    const response = await fetch(ApiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      return { message: "Failed to download deposits export", status: 400 };
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error downloading deposits export:", error);
    return { message: "Error downloading deposits export", status: 400 };
  }
};