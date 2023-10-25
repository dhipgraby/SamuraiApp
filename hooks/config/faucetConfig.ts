'use client'
import { usePrepareContractWrite } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { ethers } from "ethers";
import { faucetContract, tokenContract } from "@/contracts/contractData";

interface FaucetProps {
    amountTo: bigint;
}

export function useFaucetConfig({ amountTo }: FaucetProps) {

    const depositTokens = usePrepareContractWrite({
        address: faucetContract.address as web3Address,
        abi: faucetContract.abi,
        functionName: 'replenishFaucet',
        enabled: false,
        args: [BigInt('0')],
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
        enabled: Boolean(amountTo !== BigInt('0') && amountTo !== BigInt('')),
        args: [faucetContract.address, amountTo],
    });

    return {
        tokenConfig,
        requestTokens,
        depositTokens
    }
}
