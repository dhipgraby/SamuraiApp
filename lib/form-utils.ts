export const validateFields = (fields: any, Schema: any): boolean => {
    const validatedFields = Schema.safeParse(fields);
    return validatedFields.success;
  };

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