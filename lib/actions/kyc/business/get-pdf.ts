import { PDF_URL } from "@/lib/constants";

export const getPdf = async (token: string) => {
  try {
    const response = await fetch(PDF_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    return error;
  }
};