'use client'
import { useSimulateContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { web3Address } from "@/dto/tokenDto";
import { pools } from "@/data/pools";
import { escrowContract, stakingPlatformContract, tokenContract } from "@/contracts/contractData";

export function useStakingConfig({ amountTo = '0', stakeId, poolType }: { amountTo: string, stakeId: number, poolType: number }) {
    // Function used to stake in a pool
    // Payable function
    const { data: stakeTokensSimulation } = useSimulateContract({
        address: stakingPlatformContract.address as web3Address,
        abi: pools[poolType].abi,
        functionName: 'stake',
        value: parseEther("0.0009"),
        args: [amountTo]
    });

    const stakeTokens = useWriteContract();

    // Function used to claim from the Main Staking Platform Contract
    // Payable function
    const { data: claimTokensSimulation } = useSimulateContract({
        address: stakingPlatformContract.address as web3Address,
        abi: stakingPlatformContract.abi,
        functionName: 'claimStakeAndReward',
        value: parseEther("0.0009"),
        args: [BigInt(stakeId)]
    });

    const claimTokens = useWriteContract();

    // Function used to increase the allowance from User account to the Escrow Contract
    // args: escrow address, amount
    const { data: tokenConfigSimulation } = useSimulateContract({
        ...tokenContract,
        functionName: 'increaseAllowance',
        args: [escrowContract.address, BigInt(amountTo)],
    },
);

    const tokenConfig = useWriteContract();

    return {
        tokenConfig: {
            writeContract: tokenConfig,
            simulation: tokenConfigSimulation,
        },
        stakeTokens: {
            writeContract: stakeTokens,
            simulation: stakeTokensSimulation,
        },
        claimTokens: {
            writeContract: claimTokens,
            simulation: claimTokensSimulation,
        }
    }
}