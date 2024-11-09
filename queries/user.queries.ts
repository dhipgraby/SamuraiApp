import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServerSubmitProps } from "@/types/form-types";
import { ServerSubmit } from "@/lib/server-handler";
import { useUser } from "@/hooks/userHook";

type State = {
    address: `0x${string}` | undefined;
    ethBalance: string;
    tokenBalance: string;
};

const initialState: State = {
    address: undefined,
    ethBalance: '0',
    tokenBalance: '0',
};

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



//USER BALANCES
export const useUserBalances = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['user-balances', { userBalance: '0', ethBalance: '0' }],
        queryFn: () => {
            const data = queryClient.getQueryData(['user-balances']);
            console.log('data_----------------', data);
            return data || { userBalance: '0', ethBalance: '0' };
        },
        refetchOnWindowFocus: false,
        enabled: true
    });
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