import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { 
    BaseError, 
    ContractFunctionRevertedError, 
    ContractFunctionExecutionError,
    EstimateGasExecutionError,
    ChainMismatchError,
} from 'viem';
import { web3Address } from "@/dto/tokenDto";
import { chainId, faucetContract } from "@/contracts/contractData";
import { parseEther } from 'viem';
import { toast } from 'sonner';

export function useFaucetContract({ readyToClaim }: { readyToClaim: boolean }) {
    // Simulate contract write to get the request
    const { 
        data: simulateData, 
        error: simulateError 
    } = useSimulateContract({
        address: faucetContract.address as web3Address,
        abi: faucetContract.abi,
        functionName: 'requestTokens',
        value: parseEther("0.0009"),
        query: {
            enabled: readyToClaim,
            retry: false
        }
    });

    // Error logging utility
    const logError = (error: any) => {
        if (error instanceof BaseError) {
            console.error('Base Error:', error.message);

            // Walk through error causes
            let cause = error.cause;
            while (cause) {
                console.error('Cause:', cause);
                cause = (cause as any).cause;
            }

            // Specific error type handling
            if (error instanceof ContractFunctionRevertedError) {
                console.error('Contract Function Reverted:', {
                    signature: error.signature,
                    args: error,
                });
                toast.error('Contract function call was reverted');
            }

            if (error instanceof ContractFunctionExecutionError) {
                console.error('Contract Function Execution Error', error.message);
            }

            if (error instanceof EstimateGasExecutionError) {
                console.error('Gas Estimation Error', error.message);
            }

            if (error instanceof ChainMismatchError) {
                console.error('Chain Mismatch', error.message);
                toast.error('Incorrect network connected');
            }
        } else {
            console.error('Unknown Error:', error);
            toast.error('An unexpected error occurred');
        }
    };

    // Write contract
    const {
        data: submitTxFaucetClaim,
        error: errorFaucetClaim,
        isSuccess: successFaucetClaim,
        isPending: loadingClaim,
        writeContract: FaucetClaim,
    } = useWriteContract({
        mutation: {
            onError: (error) => {
                logError(error);
            }
        }
    });

    // Wait for transaction
    const {
        isLoading: loadingTxFaucetClaim,
        isSuccess: isSuccessTxFaucetClaim,
        error: isErrorTxFaucetClaim,
        refetch: refetchTxFaucetClaim
    } = useWaitForTransactionReceipt({
        chainId,
        confirmations: 1,
        query: { 
            enabled: !!submitTxFaucetClaim 
        },
        hash: submitTxFaucetClaim
    });

    // Claim function
    const handleFaucetClaim = () => {
        try {
            if (simulateError) {
                logError(simulateError);
                return;
            }

            if (simulateData?.request) {
                FaucetClaim(simulateData.request);
            } else {
                console.error('No valid contract request');
                toast.error('Failed to prepare contract request');
            }
        } catch (error) {
            logError(error);
        }
    };

    // Log simulate error if it exists
    if (simulateError) {
        logError(simulateError);
    }

    return {
        FaucetClaim: handleFaucetClaim,
        successFaucetClaim,
        errorFaucetClaim,
        loadingClaim,
        loadingTxFaucetClaim,
        isSuccessTxFaucetClaim,
        isErrorTxFaucetClaim,
        submitTxFaucetClaim,
        simulateError,
        refetchTxFaucetClaim
    };
}