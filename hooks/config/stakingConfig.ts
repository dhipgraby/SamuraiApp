'use client'
import { useAccount, usePrepareContractWrite } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { handlePrepareFaucetError } from "@/helpers/txHelper";
import { ethers } from "ethers";

interface StakingProps {
    escrowAddress?: web3Address | undefined;
    stakingPoolAddress: web3Address | undefined;
    tokenStakingPlatformAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    escrowAbi?: any;
    oneDayStakingContractAbi: any;
    tokenStakingPlatformAbi: any;
    yenAbi: any;
    amountTo?: string;
    stakeId?: string;
}

export function useStakingConfig({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, oneDayStakingContractAbi, tokenStakingPlatformAbi, yenAbi, amountTo = '0', stakeId }: StakingProps) {

    // Function used to claim from the One Day Staking Pool Contract
    // Args: address, amount, pooltype, duration
    // Payable function
    const stakeTokens = usePrepareContractWrite({
        address: stakingPoolAddress as web3Address,
        abi: oneDayStakingContractAbi,
        functionName: 'stake',
        value: ethers.parseEther("0.0009"),
        args: [amountTo]
    });

    // Function used to claim from the Main Staking Platform Contract
    // Payable function
    const claimTokens = usePrepareContractWrite({
        address: tokenStakingPlatformAddress as web3Address,
        abi: tokenStakingPlatformAbi,
        functionName: 'claimStakeAndReward',
        value: ethers.parseEther("0.0009")
    });

    // Function used to increase the allowance from User account to the Escrow Contract
    // args: escrow address, amount
    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: yenAbi,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [escrowAddress, (amountTo !== '0' && amountTo !== '') ? ethers.parseEther(amountTo) : amountTo],
    });

    return {
        tokenConfig,
        stakeTokens,
        claimTokens
    }
}
