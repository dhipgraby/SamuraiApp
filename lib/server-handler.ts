import { ServerSubmitProps } from "@/types/form-types";
import axios from "axios";
import { formatError } from "./form-utils";
import { toast } from "sonner";
// import { logout } from "./actions/logout";
// import { isRedirectError } from "next/dist/client/components/redirect";
// import { AuthError } from "next-auth";

//REQUESTS HANDLERS
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

export async function handleServerPost(url: string, data: any, token: string, jsonFormat: boolean = true) {
    const response = await axios.post(url,
        data,
        {
            headers: {
                "Content-Type": jsonFormat ? "application/json" : "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        });

    return response.data;
}

//ERROR HANDLERS
export async function handleServerError(error: any) {
    try {
        // if (error && error.message === "Unauthorized") await logout();
        if (axios.isAxiosError(error)) {
            const response = error.response;
            //   if (response?.statusText === "Unauthorized" 
            //|| response?.data.message === "Unauthorized") await logout();

            if (response && response.data) {
                const { message, statusCode } = response.data;

                // Handle specific status code 409
                if (statusCode !== 200) {
                    console.log("Conflict error: ", message);
                    return { message, status: statusCode };
                }
                return { message, status: statusCode };
            }

            if (error.code === "ECONNREFUSED") {
                return { message: "Connection refused. Please try again later or contact support.", status: 500 };
            }
        } else {
            return { message: "Unknown server error, Please try again later or contact support.", status: 500 };
        }
    } catch (catchError: any) {
        return { message: catchError.message, status: 500 };
    }
}

export async function handleAuthError(error: any, errorName: string) {
    console.log("handleAuthError error", error.data);

    if (error.message) console.error(errorName, error);

    //   if (isRedirectError(error)) console.error("Redirect error");

    if (axios.isAxiosError(error)) {
        const response = error.response;

        if (response && response.data) {
            const { statusCode, message } = response.data;
            if (statusCode === 404 || statusCode === 403) {
                return { message: message, statusCode: statusCode };
            }
        }
        if (error.code === "ECONNREFUSED") {
            return { message: "Connection refused. Please try again later or contact support.", statusCode: 400 };
        }
    }

    //   if (error instanceof AuthError) {
    //     const { type, cause } = error;
    //     console.log("auth error: ", error);
    //     switch (type) {
    //       case "CredentialsSignin":
    //         return { message: "Invalid credentials.", statusCode: 400 };
    //       case "CallbackRouteError":
    //         return { message: cause?.err?.toString(), statusCode: 400 };
    //       default:
    //         return { message: "Something went wrong.", statusCode: 400 };
    //     }
    //   }
    return { message: error, statusCode: 400 };
}
