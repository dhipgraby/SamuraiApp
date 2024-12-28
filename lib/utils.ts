import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";
import { ServerSubmitProps } from "@/types/form-dtos";

export const ServerSubmit = async ({
  serverAction,
  setIsLoading,
  setErrorMsg,
  nextStep
}: ServerSubmitProps) => {
  try {
    setErrorMsg(null);
    setIsLoading(true);

    const response = await serverAction();
    // Check if the response is defined
    if (!response) {
      setIsLoading(false);
      setErrorMsg("Empty response from the server. Please try again or contact support.");
      return;
    }
    // Check if the response indicates an error
    if ((response.status && response.status !== 200) || (response.statusCode && response.statusCode !== 200)) {
      // Check if there are specific error messages in the response
      const errorMessage = formatError(response);
      toast.error(errorMessage);
      setErrorMsg(errorMessage);
      setIsLoading(false);
      return response;
    } else {
      if (nextStep) nextStep();
      toast.success(response.message);
      setIsLoading(false);
      return response;
    }
  } catch (error: any) {
    setIsLoading(false);
    const errorMessage = formatError(error);
    setErrorMsg(errorMessage);
    toast.error(errorMessage);
    throw error; // Ensure the error is thrown to propagate to frontend
  }
};

export const validateFields = (fields: any, Schema: any): boolean => {
  const validatedFields = Schema.safeParse(fields);
  return validatedFields.success;
};

export const bufferToBlobUrl = (buffer: any, fileType: string) => {
  const blob = new Blob([new Uint8Array(buffer)], { type: fileType });
  return URL.createObjectURL(blob);
};

export const mimeTypes: { [key: string]: string } = {
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf"
};

export const convertToFormData = (
  values: Record<string, any>,
  excludeKeys: string[] = []
): FormData => {

  const formData = new FormData();
  Object.keys(values).forEach(key => {
    if (!excludeKeys.includes(key)) {
      formData.append(key, values[key]);
    }
  });

  return formData;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatError(response: any) {
  const errorMessage = "Something went wrong, try again or contact support";
  if (response.message) {
    if (Array.isArray(response.message)) {
      return response.message.join(", ");
    } else {
      return response.message;
    }
  } else if (response.error) {
    if (Array.isArray(response.error)) {
      return response.error.join(", ");
    } else {
      return response.error;
    }
  }
  return errorMessage;
}

export function getEnumLength(enumObj: object): number {
  // Filter out numeric keys (reverse mappings) and get the length of the remaining keys
  return Object.keys(enumObj).filter(key => isNaN(Number(key))).length;
}
export function transformToFileFormat(userInfo: any, documentKey: string) {
  if (!userInfo[documentKey] || !userInfo[documentKey].fileContent) return undefined;
  const { fileContent, fileExtension, fileName } = userInfo[documentKey];
  const mimeType = mimeTypes[fileExtension.toLowerCase()] || "application/octet-stream";
  const fileUrl = bufferToBlobUrl(fileContent.data, mimeType);
  const fileProps = new File([new Uint8Array(fileContent.data)], fileName, { type: mimeType });
  const userFile = { file: fileProps, name: fileName, url: fileUrl, type: fileProps.type, size: fileProps.size };
  return userFile;
}

export function datesToISOString(values: { [key: string]: any }, dateFields: string[]): { [key: string]: any } {
  const result = { ...values };

  dateFields.forEach(field => {
    if (values[field]) {
      result[field] = new Date(values[field]).toISOString();
    }
  });

  return result;
}

export function valuesToNumber(values: { [key: string]: any }, dateFields: string[]): { [key: string]: any } {
  const result = { ...values };

  dateFields.forEach(field => {
    if (values[field]) {
      result[field] = Number(values[field]);
    }
  });

  return result;
}