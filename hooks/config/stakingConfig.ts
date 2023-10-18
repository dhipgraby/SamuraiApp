import { usePrepareContractWrite } from "wagmi";
import { parseEther } from "ethers";
import { web3Address } from "@/dto/tokenDto";
import { pools } from "@/data/pools";
import { escrowContract, stakingPlatformContract, tokenContract } from "@/contracts/contractData";

export function usePrepareStakingConfig({ amount, poolType }: any) {
    // Function used to stake in a pool
    // Payable function
    const stakeTokens = usePrepareContractWrite({
        address: stakingPlatformContract.address as web3Address,
        abi: pools[poolType].abi,
        functionName: 'stake',
        value: parseEther("0.0009"),
        args: [amount]
    });
    return { stakeTokens }
};

export async function usePrepareClaimConfig({ stakeId }) {

    // Function used to claim from the Main Staking Platform Contract
    // Payable function
    const claimTokens = usePrepareContractWrite({
        address: stakingPlatformContract.address as web3Address,
        abi: stakingPlatformContract.abi,
        functionName: 'claimStakeAndReward',
        value: parseEther("0.0009"),
        args: [stakeId]
    });
    return { claimTokens }
};
''
export async function usePrepareAllowanceConfig({ amount }) {

    // Function used to increase the allowance from User account to the Escrow Contract
    // args: escrow address, amount
    const increaseAllowance = usePrepareContractWrite({
        ...tokenContract,
        abi: tokenContract.abi,
        functionName: 'increaseAllowance',
        args: [escrowContract.address, amount],
    });
    return { increaseAllowance }
};
