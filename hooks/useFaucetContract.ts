import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { BaseError, ContractFunctionRevertedError, ContractFunctionExecutionError } from 'viem';
import { web3Address } from "@/dto/tokenDto";
import { faucetContract } from "@/contracts/contractData";
import { ethers } from "ethers";
import { toast } from "react-toastify";

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
                toast.warning(`Claim tokens contract: ${cause}`)
            }
        },
        value: ethers.parseEther("0.0009")
    });

    const { data: submitTxFaucetClaim,
        error: errorFaucetClaim,
        isSuccess: successFaucetClaim,
        write: FaucetClaim
    } = useContractWrite(claimConfig.config);

    const { isLoading: loadingTxFaucetClaim, isSuccess: isSuccessTxFaucetClaim, error: isErrorTxFaucetClaim, refetch: refetchTxFaucetClaim }
        = useWaitForTransaction({
            chainId: 31337,
            confirmations: 1,
            cacheTime: Infinity,
            hash: submitTxFaucetClaim?.hash
        });

    return {
        FaucetClaim,
        successFaucetClaim,
        errorFaucetClaim,
        loadingTxFaucetClaim,
        isSuccessTxFaucetClaim,
        isErrorTxFaucetClaim,
        refetchTxFaucetClaim,
        submitTxFaucetClaim
    };
}
