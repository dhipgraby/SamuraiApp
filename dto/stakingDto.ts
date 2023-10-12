import { Address } from "./tokenDto";
import { web3Address } from "./tokenDto";

// @notice: this is the interface Props used to get the contract addresses
export interface StakePoolAddressesProps {
    escrowAddress: Address | undefined;
    stakingPoolAddress: Address | undefined;
    tokenStakingPlatformAddress: Address | undefined;
    tokenAddress: Address | undefined;
}

// @notice: this is the interface Props used trigger a staking in a pool
export interface StakingProps {
    escrowAddress?: web3Address | undefined;
    stakingPoolAddress: web3Address | undefined;
    tokenStakingPlatformAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    escrowAbi?: any;
    tokenStakingPlatformAbi: any;
    yenAbi: any;
    amountTo?: string | number | undefined;
    stakeId?: number | undefined;
    poolType?: number | undefined;
}

type ABI = any;

// @notice: this is the interface for pools returned from the PoolCard component
export interface Pool {
  index: number;
  duration: string;
  text: string;
  reward: string;
  abi: ABI;
}

// @notice: this is the type of the data that is returned from the useStakingContract hook
export  type PoolCardProps = {
  duration: string;
  text: string;
  reward: string;
  userStakeData: any; // indicates whether the user has a stake in the pool
  useGetStakingData: any; 
};