import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerSubmitProps } from "@/types/form-types";
import { ServerSubmit } from "@/lib/server-handler";

//USER LOGIN
export const useSubmitMutation = () => {
    const submitMutation = useMutation({
        mutationFn: async (submitProps: ServerSubmitProps) => {
            try {
                const serverResponse = await ServerSubmit(submitProps);
                return { serverResponse }
            } catch (error: any) {
                return { message: error, status: 400 };
            }
        },
        onSuccess: (data) => {
            return data.serverResponse
        }
    });
    return {
        submitMutation
    }
};

//USER SESSION
export const useUserSession = () => {
    return useQuery({
        queryKey: ["user-session"],
        queryFn: async () => {
            return true;
        },
        refetchOnWindowFocus: false
    });
};