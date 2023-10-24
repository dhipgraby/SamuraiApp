'use client'
import { usePrepareContractWrite } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { ethers } from "ethers";
import { faucetContract, tokenContract } from "@/contracts/contractData";

interface FaucetProps {
    amountTo?: string;
}

export function useFaucetConfig({ amountTo = '0' }: FaucetProps) {

    const depositTokens = usePrepareContractWrite({
        address: faucetContract.address as web3Address,
        abi: faucetContract.abi,
        functionName: 'replenishFaucet',
        enabled: (amountTo !== '0' && amountTo !== ''),
        args: [ethers.parseEther(amountTo)],
    });

    const requestTokens = usePrepareContractWrite({
        address: faucetContract.address as web3Address,
        abi: faucetContract.abi,
        functionName: 'requestTokens',
        value: ethers.parseEther("0.0009")
    });

    const tokenConfig = usePrepareContractWrite({
        address: tokenContract.address as web3Address,
        abi: tokenContract.abi,
        functionName: 'increaseAllowance',
        enabled: (amountTo !== '0' && amountTo !== ''),
        args: [faucetContract.address, ethers.parseEther(amountTo)],
    });

    return {
        tokenConfig,
        requestTokens,
        depositTokens
    }
}
