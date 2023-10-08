'use client'
import { usePrepareContractWrite } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { handlePrepareFaucetError } from "@/helpers/txHelper";
import { ethers } from "ethers";

interface FaucetProps {
    faucetAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    faucetAbi: any;
    tokenAbi: any;
    amountTo?: string;
    setNeedAllowance: (allow: boolean) => void;
}

export function useFaucetConfig({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo = '0', setNeedAllowance }: FaucetProps) {

    const depositTokens = usePrepareContractWrite({
        address: faucetAddress as web3Address,
        abi: faucetAbi,
        functionName: 'replenishFaucet',
        onError: (e) => handlePrepareFaucetError(e, setNeedAllowance),
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: (amountTo !== '0' && amountTo !== '') ? [ethers.parseEther(amountTo)] : [amountTo],
    });

    const requestTokens = usePrepareContractWrite({
        address: faucetAddress as web3Address,
        abi: faucetAbi,
        functionName: 'requestTokens',
        value: ethers.parseEther("0.0009")
    });

    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: tokenAbi,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [faucetAddress, (amountTo !== '0' && amountTo !== '') ? ethers.parseEther(amountTo) : amountTo],
    });

    return {
        tokenConfig,
        requestTokens,
        depositTokens
    }
}
