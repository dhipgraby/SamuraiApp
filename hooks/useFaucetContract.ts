import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useContractReads, useAccount } from "wagmi";
import { ethers } from "ethers";
import { handlePrepareFaucetError } from "@/helpers/txHelper";
import { web3Address } from "@/dto/tokenDto";

export function useFaucetContract(faucetAddress: string, tokenAddress: string, faucetAbi: any, tokenAbi: any, amountTo: string) {
    const [needAllowance, setNeedAllowance] = useState(false);
    const { address } = useAccount();

    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: tokenAbi
    };

    const faucetConfig = usePrepareContractWrite({
        address: faucetAddress as web3Address,
        abi: faucetAbi,
        functionName: 'depositTokens',
        onError: (e) => handlePrepareFaucetError(e, setNeedAllowance),
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: (amountTo !== '0' && amountTo !== '') ? [ethers.parseEther(amountTo)] : [amountTo],
    });

    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: tokenAbi,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [faucetAddress, (amountTo !== '0' && amountTo !== '') ? ethers.parseEther(amountTo) : amountTo],
    });

    const faucetWrite = useContractWrite(faucetConfig.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    const readData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, faucetAddress as web3Address]
            },
        ]
    });

    return {
        needAllowance,
        faucetWrite,
        tokenWrite,
        readData
    };
}
