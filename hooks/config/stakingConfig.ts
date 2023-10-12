// @/hooks/config/stakingConfig.ts
'use client'
import { usePrepareContractWrite } from "wagmi";
import { handlePrepareFaucetError } from "@/helpers/txHelper";
import { parseEther } from "ethers";
import { web3Address } from "@/dto/tokenDto";
import { StakingProps } from "@/dto/stakingDto";
import pools from "@/data/pools";



export function useStakingConfig({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, tokenStakingPlatformAbi, yenAbi, amountTo, stakeId, pool }: StakingProps) {


    // Function used to stake in a pool
    // Payable function
    const stakeTokens = usePrepareContractWrite({
        address: stakingPoolAddress as web3Address,
        abi: pool ? pools[pool].abi : undefined,
        functionName: 'stake',
        value: parseEther("0.0009"),
        args: [amountTo]
    });

    // Function used to claim from the Main Staking Platform Contract
    // Payable function
    const claimTokens = usePrepareContractWrite({
        address: tokenStakingPlatformAddress as web3Address,
        abi: tokenStakingPlatformAbi,
        functionName: 'claimStakeAndReward',
        value: parseEther("0.0009"),
        args: [stakeId]
    });

    // Function used to increase the allowance from User account to the Escrow Contract
    // args: escrow address, amount
    const tokenConfig = usePrepareContractWrite({
        address: tokenAddress as web3Address,
        abi: yenAbi,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [escrowAddress, (amountTo !== '0' && amountTo !== '') ? parseEther(amountTo as string) : amountTo],
    });

    return {
        tokenConfig,
        stakeTokens,
        claimTokens
    }
}
