import { useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { userStore } from "@/store/user";

export function useUserData() {

    const address = userStore((state: any) => state.address)

    const { data: userBalance, refetch: refetchUserBalance } = useContractRead({
        ...tokenContract,
        functionName: 'balanceOf',
        enabled: Boolean(address),
        args: [address as web3Address]
    },);

    return {
        userBalance,
        refetchUserBalance
    };
}
