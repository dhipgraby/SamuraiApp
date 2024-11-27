import { useAccount, useBalance } from "wagmi";
import { useReadContract } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { parseAmount } from "@/helpers/converter";
import { useQueryClient } from "@tanstack/react-query";

export function useUser() {
    const queryClient = useQueryClient();
    const { address } = useAccount();

    if (address) {
        queryClient.setQueryData(['user-address'], address);
        queryClient.invalidateQueries({ queryKey: ['user-address'] });
    }

    const { data: ethBalance } = useBalance({
        address,
        query: {
            enabled: Boolean(address)
        }
    });

    const { data: userBalance, refetch: refetchUserBalance } = useReadContract({
        address: tokenContract.address as web3Address,
        abi: tokenContract.abi,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: Boolean(address)
        }
    });

    const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
    const ethereumBalance = ethBalance ? parseAmount(ethBalance.value) : "0";

    if (address) {
        queryClient.setQueryData(['user-balances'], { 
            userBalance: balance, 
            ethBalance: ethereumBalance 
        });
        queryClient.invalidateQueries({ queryKey: ['user-balances'] });
    }

    return {
        address,
        ethBalance,
        userBalance,
        refetchUserBalance,
    };
}