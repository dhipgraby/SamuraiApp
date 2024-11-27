import { useSimulateContract, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { chainId, faucetContract, tokenContract } from "@/contracts/contractData";
import { useUserAddress } from "@/queries/user.queries";

interface FaucetProps {
    amountTo: bigint;
}

export function useYenContract({ amountTo = BigInt('0') }: FaucetProps) {
    const {data} = useUserAddress();
    const address = data as web3Address

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { data: tokenConfig } = useSimulateContract({
        address: tokenContract.address as web3Address,
        abi: tokenContract.abi,
        functionName: 'increaseAllowance',
        args: [faucetContract.address, amountTo],
        query: {
            enabled: Boolean(amountTo !== BigInt('0') && amountTo !== BigInt(''))
        }
    });

    const { 
        data: submitTxIncreasseAllowance,
        error: errorIncreasseAllowance,
        writeContract: IncreasseAllowance
    } = useWriteContract();

    const { 
        isLoading: loadingTxIncreasseAllowance, 
        isSuccess: isSuccessTxIncreasseAllowance, 
        error: isErrorTxIncreasseAllowance 
    } = useWaitForTransactionReceipt({
        hash: submitTxIncreasseAllowance,
        chainId: chainId
    });

    // ---------------------   READ FUNCTIONS ------------------------

    const { data: allowance } = useReadContract({
        address: tokenContract.address as web3Address,
        abi: tokenContract.abi,
        functionName: 'allowance',
        args: [address as web3Address, faucetContract.address as web3Address]
    });

    const handleIncreaseAllowance = () => {
        if (tokenConfig?.request) {
            IncreasseAllowance(tokenConfig.request);
        }
    };

    return {
        IncreasseAllowance: handleIncreaseAllowance,
        successIncreasseAllowance: !!submitTxIncreasseAllowance,
        isSuccessTxIncreasseAllowance,
        errorIncreasseAllowance,
        isErrorTxIncreasseAllowance,
        loadingTxIncreasseAllowance,
        allowance,
    };
}