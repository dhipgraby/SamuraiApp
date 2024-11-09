import { usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { chainId, faucetContract, tokenContract } from "@/contracts/contractData";
import { useAccount } from "wagmi";


interface FaucetProps {
    amountTo: bigint;
}

export function useYenContract({ amountTo = BigInt('0') }: FaucetProps) {
    
    const { address } = useAccount();

    // ---------------------   WRITE FUNCTIONS ------------------------

    const tokenConfig = usePrepareContractWrite({
        address: tokenContract.address as web3Address,
        abi: tokenContract.abi,
        functionName: 'increaseAllowance',
        enabled: Boolean(amountTo !== BigInt('0') && amountTo !== BigInt('')),
        args: [faucetContract.address, amountTo],
    });

    const { data: submitTxIncreasseAllowance,
        error: errorIncreasseAllowance,
        isSuccess: successIncreasseAllowance,
        write: IncreasseAllowance
    } = useContractWrite(tokenConfig.config);

    const { isLoading: loadingTxIncreasseAllowance, isSuccess: isSuccessTxIncreasseAllowance, error: isErrorTxIncreasseAllowance }
        = useWaitForTransaction({
            chainId: chainId,
            confirmations: 1,
            cacheTime: Infinity,
            hash: submitTxIncreasseAllowance?.hash
        });

    // ---------------------   READ FUNCTIONS ------------------------

    const { data: allowance } = useContractRead({
        ...tokenContract,
        functionName: 'allowance',
        args: [address as web3Address, faucetContract.address as web3Address]
    });

    return {
        IncreasseAllowance,
        successIncreasseAllowance,
        isSuccessTxIncreasseAllowance,
        errorIncreasseAllowance,
        isErrorTxIncreasseAllowance,
        loadingTxIncreasseAllowance,
        allowance,
    };
}
