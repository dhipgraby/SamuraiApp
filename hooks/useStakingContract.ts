// @/hooks/useStakingContract.ts
import { useContractWrite, useContractReads, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";
import { StakingProps } from '../dto/stakingDto';


export function useStakingContract({
  escrowAddress,
  stakingPoolAddress,
  tokenStakingPlatformAddress,
  tokenAddress,
  escrowAbi,
  tokenStakingPlatformAbi,
  yenAbi,
  amountTo = "0",
  stakeId,
  poolType
}: StakingProps) {
  const { address } = useAccount();

  const tokenContract = {
    address: tokenAddress as web3Address,
    abi: yenAbi,
  };

  const tokenStakingPlatformContract = {
    address: tokenStakingPlatformAddress as web3Address,
    abi: tokenStakingPlatformAbi,
  };

  const escrowContract = {
    address: escrowAddress as web3Address,
    abi: escrowAbi,
  };

  // ---------------------   WRITE FUNCTIONS ------------------------

  const { claimTokens, stakeTokens, tokenConfig } = useStakingConfig({
    escrowAddress,
    stakingPoolAddress,
    tokenStakingPlatformAddress,
    tokenAddress,
    tokenStakingPlatformAbi,
    yenAbi,
    amountTo,
    stakeId,
    poolType
  });

  const platformClaim = useContractWrite(claimTokens.config);
  const poolStakeWrite = useContractWrite(stakeTokens.config);
  const tokenWrite = useContractWrite(tokenConfig.config);

  // ---------------------   READ FUNCTIONS ------------------------

  const readData = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: "allowance",
        args: [address as web3Address, escrowAddress as web3Address],
      },
      {
        // Function used to fetch the stakeData.
        ...tokenStakingPlatformContract,
        functionName: "getStakeData",
        args: [stakeId as number], // uint256 stakeId: the stakeId to query.
      },
      { 
        ...escrowContract,
        functionName: "getRewardBalance",
      },
    ],
  });

  const userData = useContractReads({
    contracts: [
      {
        ...escrowContract,
        functionName: "userStakeRewards",
        args: [
          address as web3Address,
          stakeId as Number, // uint256 stakeId: the stakeId to query.
        ],
      },
      {
        ...escrowContract,
        functionName: "userStakeBalances",
        args: [address as web3Address, stakeId as Number], // stakeId
      },
      {
        //Function to fetch all stake IDs for a user.
        ...tokenStakingPlatformContract,
        functionName: "getUserStakeIds",
        args: [address as web3Address], // address: The user's address.
      },
      {
        //Function to fetch all stake IDs for a user.
        ...tokenStakingPlatformContract,
        functionName: "getUserStakeIdsInPool",
        args: [
          address as web3Address, // address: The user's address.
          poolType as number // uint256 poolType: the poolType to query.
        ], 
      },
    ],
  });

  return {
    platformClaim,
    poolStakeWrite,
    tokenWrite,
    readData,
    userData,
  };
}
