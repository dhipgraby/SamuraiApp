import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerSubmitProps } from "@/types/form-dtos";
import { ServerSubmit } from "@/lib/utils";




export const useLoginMutation = () => {
    const submitLoginMutation = useMutation({
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
        submitLoginMutation
    }
};
