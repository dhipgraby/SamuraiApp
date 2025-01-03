import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import { getSettings, getUser } from "@/lib/actions/get-user";
import { ServerSubmitProps } from "@/types/form-dtos";
import { ServerSubmit } from "@/lib/utils";

//USER LOGIN
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

//USER SESSION
export const useUserSession = () => {
    return useQuery({
        queryKey: ["user-session"],
        queryFn: async () => {
            const { retrieveAccessToken } = useSession()
            const token = retrieveAccessToken()
            return await getUser({ token })
        },
        refetchOnWindowFocus: false
    });
};

export const useUserSettingsQuery = () => {
    return useQuery({
        queryKey: ["user-settings"],
        queryFn: async () => {
            const { retrieveAccessToken } = useSession()
            const accessToken = retrieveAccessToken()
            const personalInfo = await getSettings(accessToken);
            return personalInfo;
        },
        refetchOnWindowFocus: false
    });
};

export const useUserSettingsMutation = () => {
    const queryClient = useQueryClient();
    const submitSettingsMutation = useMutation({
        mutationFn: async (submitProps: ServerSubmitProps) => {
            try {
                const serverResponse = await ServerSubmit(submitProps);
                return { serverResponse }
            } catch (error: any) {
                return { message: error, status: 400 };
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user-settings'] });
            return data.serverResponse
        }
    });
    return {
        submitSettingsMutation
    }
};