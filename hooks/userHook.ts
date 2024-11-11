import { useContractRead, useBalance } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { parseAmount } from "@/helpers/converter";
import { userStore } from "@/store/user";
import { useQueryClient } from "@tanstack/react-query";

export function useUser() {

    const queryClient = useQueryClient();
    const address = userStore((state) => state.address)
    const updateBalance = userStore((state) => state.updateBalance)
    const updateEthBalance = userStore((state) => state.updateEthBalance)

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

    async function updateUserBalance() {
        const getBalance: any = await refetchUserBalance()
        const updatedBalance = parseAmount(getBalance.data.toString());
        updateBalance(updatedBalance)
    }

    async function updateUserEthBalance() {
        if (ethBalance) {
            const updatedBalance = parseAmount(ethBalance.formatted.toString());
            updateEthBalance(updatedBalance)
        }
    }

    const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
    const ethereumBalance = ethBalance ? ethBalance.formatted : '0';
    queryClient.setQueryData(['user-balances'], { userBalance: balance, ethBalance: ethereumBalance });
    queryClient.invalidateQueries({ queryKey: ['user-balances'] });

    return {
        ethBalance,
        userBalance,
        refetchUserBalance,
        updateUserBalance,
        updateUserEthBalance
    };
}
