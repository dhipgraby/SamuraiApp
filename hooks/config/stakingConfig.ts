'use client'
import { usePrepareContractWrite } from "wagmi";
import { parseEther } from "ethers";
import { web3Address } from "@/dto/tokenDto";
import { pools } from "@/data/pools";
import { escrowContract, stakingPlatformContract, tokenContract } from "@/contracts/contractData";

export function useStakingConfig({ amountTo = '0', stakeId, poolType }: { amountTo: string, stakeId: number, poolType: number }) {
    // Function used to stake in a pool
    // Payable function
    const stakeTokens = usePrepareContractWrite({
        address: stakingPlatformContract.address as web3Address,
        abi: pools[poolType].abi,
        functionName: 'stake',
        value: parseEther("0.0009"),
        args: [amountTo]
    });

    // Function used to claim from the Main Staking Platform Contract
    // Payable function
    const claimTokens = usePrepareContractWrite({
        address: stakingPlatformContract.address as web3Address,
        abi: stakingPlatformContract.abi,
        functionName: 'claimStakeAndReward',
        value: parseEther("0.0009"),
        args: [BigInt(stakeId)]
    });

    // Function used to increase the allowance from User account to the Escrow Contract
    // args: escrow address, amount
    const tokenConfig = usePrepareContractWrite({
        ...tokenContract,
        functionName: 'increaseAllowance',
        enabled: ((amountTo !== '0' && amountTo !== '')),
        args: [escrowContract.address, BigInt(amountTo)],
    });

    return {
        tokenConfig,
        stakeTokens,
        claimTokens
    }
}
