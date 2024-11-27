import { useReadContract } from "wagmi";
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

  const getUserStakeIdsInPool = useReadContract({
    //Function to fetch all stake IDs for a user.
    address: stakingPlatformContract.address,
    abi: stakingPlatformContract.abi,
    functionName: "getUserStakeIdsInPool",
    args: [
      address as web3Address,
      BigInt(poolType)
    ],
  });

  const getStakeData = useReadContract({
    //Function to fetch single stake for a user.
    address: stakingPlatformContract.address,
    abi: stakingPlatformContract.abi,
    functionName: "getStakeData",
    args: [
      BigInt(stakeId)
    ],
    query: {
      enabled: Boolean(stakeId)
    }
  });

  return {
    getUserStakeIdsInPool,
    getStakeData
  };
}