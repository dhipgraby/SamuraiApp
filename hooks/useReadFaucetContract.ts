import { useReadContract } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { faucetContract } from "@/contracts/contractData";
import { useUserAddress } from "@/queries/user.queries";

export function useReadFaucetContract() {
    const { data } = useUserAddress();
    const address = data as web3Address;

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: cooldownTime } = useReadContract({
        ...faucetContract,
        functionName: 'cooldownTime',
        query: {
            enabled: true
        }
    });

    const { data: remainingTokens, refetch: refetchRemainingTokens } = useReadContract({
        ...faucetContract,
        functionName: 'remainingTokens',
        query: {
            enabled: true
        }
    });

    const { data: maxAmount } = useReadContract({
        ...faucetContract,
        functionName: 'maxAmount',
        query: {
            enabled: true
        }
    });

    const { data: lastAccessTime, refetch: refetchLastAccessTime, isLoading: loadingLastAccessTime } = useReadContract({
        ...faucetContract,
        functionName: 'lastAccessTime',
        args: address ? [address] : undefined,
        query: {
            enabled: Boolean(address)
        }
    });

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