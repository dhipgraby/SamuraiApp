import { useContractRead, useBalance, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { parseAmount } from "@/helpers/converter";
import { useQueryClient } from "@tanstack/react-query";

export function useUser() {

    const queryClient = useQueryClient();
    const address = useAccount().address;
    queryClient.setQueryData(['user-address'], address);
    queryClient.invalidateQueries({ queryKey: ['user-address'] });
    


    const { data: ethBalance } = useBalance({
        address: address as any,
        enabled: (address as any && address !== undefined)
    }) 

    const { data: userBalance, refetch: refetchUserBalance } = useContractRead({
        ...tokenContract,
        functionName: 'balanceOf',
        enabled: Boolean(address),
        args: [address as web3Address]
    },);


    const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
    const ethereumBalance = ethBalance ? ethBalance.formatted : '0';
    queryClient.setQueryData(['user-balances'], { userBalance: balance, ethBalance: ethereumBalance });
    queryClient.invalidateQueries({ queryKey: ['user-balances'] });

    const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
    const ethereumBalance = ethBalance ? ethBalance.formatted : '0';
    queryClient.setQueryData(['user-balances'], { userBalance: balance, ethBalance: ethereumBalance });
    queryClient.invalidateQueries({ queryKey: ['user-balances'] });

    return {
        address,
        ethBalance,
        userBalance,
        refetchUserBalance,
    };
}
