import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useContractReads, useAccount } from "wagmi";
import { ethers } from "ethers";
import { handlePrepareFaucetError } from "@/helpers/txHelper";
import { web3Address } from "@/dto/tokenDto";

interface FaucetProps {
    faucetAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    faucetAbi: any;
    tokenAbi: any;
    amountTo?: string;
}

export function useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo = '0' }: FaucetProps) {
    const [needAllowance, setNeedAllowance] = useState(false);
    const { address } = useAccount();

    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: tokenAbi
    };

    const faucetContract = {
        address: faucetAddress as web3Address,
        abi: faucetAbi
    };

    const depositTokens = usePrepareContractWrite({
        address: faucetAddress as web3Address,
        abi: faucetAbi,
        functionName: 'depositTokens',
        onError: (e) => handlePrepareFaucetError(e, setNeedAllowance),
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: (amountTo !== '0' && amountTo !== '') ? [ethers.parseEther(amountTo)] : [amountTo],
    });

    const requestTokens = usePrepareContractWrite({
        address: faucetAddress as web3Address,
        abi: faucetAbi,
        functionName: 'requestTokens',
    });

    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: tokenAbi,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [faucetAddress, (amountTo !== '0' && amountTo !== '') ? ethers.parseEther(amountTo) : amountTo],
    });

    const faucetWrite = useContractWrite(depositTokens.config);
    const faucetClaim = useContractWrite(requestTokens.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    const readData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, faucetAddress as web3Address]
            },
            {
                ...faucetContract,
                functionName: 'remainingTokens',
            },
        ]
    });

    return {
        needAllowance,
        faucetWrite,
        faucetClaim,
        tokenWrite,
        readData
    };
}
