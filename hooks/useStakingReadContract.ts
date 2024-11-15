import { useContractWrite, useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { StakingReadProps } from '../dto/stakingDto';
import { stakingPlatformContract } from "@/contracts/contractData";
import { useUserAddress } from "@/queries/user.queries";

export function useStakingReadContract({
  poolType,
  stakeId,
}: StakingReadProps) {

  const {data} = useUserAddress();
  const address = data as web3Address
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
