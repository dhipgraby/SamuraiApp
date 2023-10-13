import { useContractReads } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { tokenContract } from "@/contracts/contractData";
import { userStore } from "@/store/user";

export function useUserData() {

    const address = userStore((state: any) => state.address)

    const userData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: [address as web3Address]
            },
        ]
    });

    return {
        userData
    };
}
