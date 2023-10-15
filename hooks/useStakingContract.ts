import { useContractWrite, useContractReads, useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";
import { StakingProps } from '../dto/stakingDto';
import { tokenContract, stakingPlatformContract, escrowContract } from "@/contracts/contractData";
import { userStore } from "@/store/user";

export function useStakingContract({
  poolType
}: StakingProps) {

  const address = userStore((state) => state.address)

  // ---------------------   READ FUNCTIONS ------------------------

  const getUserStakeIdsInPool = useContractRead({
    //Function to fetch all stake IDs for a user.
    ...stakingPlatformContract,
    functionName: "getUserStakeIdsInPool",
    args: [
      address as web3Address,
      poolType as number
    ],
  });

  return {
    getUserStakeIdsInPool
  };
}
