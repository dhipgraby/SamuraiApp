import { useContractWrite, useContractReads, useContractRead } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";
import { StakingProps } from '../dto/stakingDto';
import { tokenContract, stakingPlatformContract, escrowContract } from "@/contracts/contractData";
import { userStore } from "@/store/user";

export function useStakingContract({
  amountTo = "0",
  stakeId,
  poolType
}: StakingProps) {

  const address = userStore((state) => state.address)

  // ---------------------   WRITE FUNCTIONS ------------------------

  const { claimTokens, stakeTokens, tokenConfig } = useStakingConfig({
    amountTo,
    stakeId,
    poolType
  });

  const platformClaim = useContractWrite(claimTokens.config);
  const poolStakeWrite = useContractWrite(stakeTokens.config);
  const tokenWrite = useContractWrite(tokenConfig.config);

  // ---------------------   READ FUNCTIONS ------------------------

  const allowance = useContractRead({
    ...tokenContract,
    functionName: "allowance",
    args: [address as web3Address, escrowContract.address as web3Address],
  });

  const getStakeData = useContractRead({
    ...stakingPlatformContract,
    functionName: "getStakeData",
    args: [stakeId as number], // uint256 stakeId: the stakeId to query.
  });

  // IF THIS IS 0 THERE IS NO REWARDS LEFT IN THE PLATFORM  
  const getEscrowRewardBalance = useContractRead({
    ...escrowContract,
    functionName: "getRewardBalance",
  });

  const userStakeRewards = useContractRead({
    ...escrowContract,
    functionName: "userStakeRewards",
    args: [
      address as web3Address,
      stakeId as Number, // uint256 stakeId: the stakeId to query.
    ],
  });

  const getUserStakeIds = useContractRead({
    //Function to fetch all stake IDs for a user.
    ...stakingPlatformContract,
    functionName: "getUserStakeIds",
    args: [address as web3Address], // address: The user's address.
  });

  const getUserStakeIdsInPool = useContractRead({
    //Function to fetch all stake IDs for a user.
    ...stakingPlatformContract,
    functionName: "getUserStakeIdsInPool",
    args: [
      address as web3Address, // address: The user's address.
      stakeId as number // uint256 poolType: the poolType to query.
    ],
  });

  return {
    platformClaim,
    poolStakeWrite,
    tokenWrite,
    allowance,
    getStakeData,
    getEscrowRewardBalance,
    userStakeRewards,
    getUserStakeIds,
    getUserStakeIdsInPool
  };
}
