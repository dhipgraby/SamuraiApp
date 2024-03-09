import { useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { parseAmount } from "@/helpers/converter";
import { userStore } from "@/store/user";

export function useUser() {

    const address = userStore((state: any) => state.address)
    const updateBalance = userStore((state: any) => state.updateBalance)

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

    return {
        userBalance,
        refetchUserBalance,
        updateUserBalance
    };
}
