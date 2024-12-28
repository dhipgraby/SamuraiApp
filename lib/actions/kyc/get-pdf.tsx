import { PDF_DOWNLOAD_URL } from "@/lib/constants";

export const getPdf = async (token: string) => {
  try {
    const response = await fetch(`${PDF_DOWNLOAD_URL}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return {
        message: "Failed to downloading PDF:",
        status: 400
      };
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    return {
      message: "Error downloading PDF:",
      status: 400
    };
  }
};
