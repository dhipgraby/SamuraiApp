import { useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { userStore } from "@/store/user";
import { faucetContract } from "@/contracts/contractData";

export function useReadFaucetContract() {

    const address = userStore((state) => state.address)

    // ---------------------   READ FUNCTIONS ------------------------

    const { data: cooldownTime } = useContractRead({
        ...faucetContract,
        functionName: 'cooldownTime',
    });

    const { data: remainingTokens, refetch: refetchRemainingTokens } = useContractRead({
        ...faucetContract,
        functionName: 'remainingTokens',
    });

    const { data: maxAmount } = useContractRead({
        ...faucetContract,
        functionName: 'maxAmount',
    });

    const { data: lastAccessTime, refetch: refetchLastAccessTime, isLoading: loadingLastAccessTime } = useContractRead({
        ...faucetContract,
        functionName: 'lastAccessTime',
        args: [address as web3Address]
    },);

    return {
        remainingTokens,
        refetchRemainingTokens,
        maxAmount,
        lastAccessTime,
        refetchLastAccessTime,
        loadingLastAccessTime,
        cooldownTime
    };
}
