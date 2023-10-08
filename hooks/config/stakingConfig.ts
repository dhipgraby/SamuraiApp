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
    tokenAbi: any;
    amountTo?: string;
    setNeedAllowance: (allow: boolean) => void;
}

export function useStakingConfig({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, oneDayStakingContractAbi, tokenStakingPlatformAbi, tokenAbi, amountTo = '0', setNeedAllowance }: StakingProps) {
    const { address } = useAccount();
    const pooltype = 0;
    const duration = 86400;
    
    const claimTokens = usePrepareContractWrite({
        address: tokenStakingPlatformAddress as web3Address,
        abi: tokenStakingPlatformAbi,
        functionName: 'claimStakeAndReward',
        value: ethers.parseEther("0.0009")
    });

    const stakeTokens = usePrepareContractWrite({
        address: stakingPoolAddress as web3Address,
        abi: oneDayStakingContractAbi,
        functionName: 'initiateStake',
        value: ethers.parseEther("0.0009"),
        args: [address, (amountTo !== '0' && amountTo !== '') ? ethers.parseEther(amountTo) : amountTo, pooltype, duration]
    });

    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: tokenAbi,
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
