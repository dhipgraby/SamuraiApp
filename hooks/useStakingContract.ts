
import { useContractWrite, useContractReads, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";

interface StakingProps {
  escrowAddress?: web3Address | undefined;
  stakingPoolAddress: web3Address | undefined;
  tokenStakingPlatformAddress: web3Address | undefined;
  tokenAddress: web3Address | undefined;
  escrowAbi?: any;
  oneDayStakingContractAbi: any;
  tokenStakingPlatformAbi: any;
  yenAbi: any;
  amountTo?: string;
  stakeId?: string | undefined;
}

export function useStakingContract({
  escrowAddress,
  stakingPoolAddress,
  tokenStakingPlatformAddress,
  tokenAddress,
  escrowAbi,
  tokenStakingPlatformAbi,
  oneDayStakingContractAbi,
  yenAbi,
  amountTo = "0",
  stakeId,
}: StakingProps) {
  const { address } = useAccount();

  const tokenContract = {
    address: tokenAddress as web3Address,
    abi: yenAbi,
  };

  const stakingPoolContract = {
    address: stakingPoolAddress as web3Address,
    abi: oneDayStakingContractAbi,
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
    oneDayStakingContractAbi,
    tokenStakingPlatformAbi,
    yenAbi,
    amountTo,
    stakeId
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
        args: [stakeId as Number], // uint256 stakeId: the stakeId to query.
      },
      { 
        ...escrowContract,
        functionName: "getRewardBalance",
      },
    ],
    enabled: true
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
