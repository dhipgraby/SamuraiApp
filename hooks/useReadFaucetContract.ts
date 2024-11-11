import { useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { faucetContract } from "@/contracts/contractData";
import { useUserAddress } from "@/queries/user.queries";

export function useReadFaucetContract() {

    const { data } = useUserAddress();
    const address = data as web3Address;
    

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
