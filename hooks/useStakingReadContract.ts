import { useContractWrite, useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { StakingReadProps } from '../dto/stakingDto';
import { stakingPlatformContract } from "@/contracts/contractData";
import { userStore } from "@/store/user";

export function useStakingReadContract({
  poolType,
  stakeId,
}: StakingReadProps) {

  const address = userStore((state: any) => state.address)
  // ---------------------   READ FUNCTIONS ------------------------

  const getUserStakeIdsInPool = useContractRead({
    //Function to fetch all stake IDs for a user.
    ...stakingPlatformContract,
    functionName: "getUserStakeIdsInPool",
    args: [
      address as web3Address,
      BigInt(poolType)
    ],
  });

  const getStakeData = useContractRead({
    //Function to fetch single stake for a user.
    ...stakingPlatformContract,
    functionName: "getStakeData",
    args: [
      BigInt(stakeId)
    ],
    enabled: (!stakeId)
  });

  return {
    getUserStakeIdsInPool,
    getStakeData
  };
}
