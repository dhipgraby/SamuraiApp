import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { BaseError, ContractFunctionRevertedError, ContractFunctionExecutionError } from 'viem';
import { web3Address } from "@/dto/tokenDto";
import { chainId, faucetContract } from "@/contracts/contractData";
import { ethers } from "ethers";

export function useFaucetContract({ readyToClaim }: { readyToClaim: boolean }) {

    // ---------------------   WRITE FUNCTIONS ------------------------    

    const claimConfig = usePrepareContractWrite({
        address: faucetContract.address as web3Address,
        abi: faucetContract.abi,
        enabled: Boolean(readyToClaim),
        functionName: 'requestTokens',
        onError: (error) => {
            if (error instanceof ContractFunctionExecutionError) {
                const cause = error.cause
                    .walk()
                    .message
                console.error(cause);
            }
        },
        value: ethers.parseEther("0.0009")
    });

    const { data: submitTxFaucetClaim,
        error: errorFaucetClaim,
        isSuccess: successFaucetClaim,
        isLoading: loadingClaim,
        write: FaucetClaim
    } = useContractWrite(claimConfig.config);

    const { isLoading: loadingTxFaucetClaim,
        isSuccess: isSuccessTxFaucetClaim,
        error: isErrorTxFaucetClaim,
        refetch: refetchTxFaucetClaim
    } = useWaitForTransaction({
        chainId: chainId,
        confirmations: 1,
        cacheTime: Infinity,
        hash: submitTxFaucetClaim?.hash
    });

    return {
        FaucetClaim,
        successFaucetClaim,
        errorFaucetClaim,
        loadingClaim,
        loadingTxFaucetClaim,
        isSuccessTxFaucetClaim,
        isErrorTxFaucetClaim,
        refetchTxFaucetClaim,
        submitTxFaucetClaim
    };
}
