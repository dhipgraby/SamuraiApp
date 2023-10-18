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
export interface StakingReadProps {
  stakeId?: number;
  poolType?: number;
}

// @notice: this is the interface Props used to trigger stake or claim in staking in pool
export interface StakingWriteProps {
  amount?: number;
  stakeId?: number;
  poolType?: number;
}

type ABI = any;

// @notice: this is the interface for the pools ABI's.
export interface Pool {
  index: number;
  address: Address;
}

export type stakeDataInPoolDto = {
  amount: string;
  claimed: boolean;
  endTime: string;
  id: string;
  pool: string;
  reward: string;
  user: string;
};


// @notice: this is the type of the data that is returned from the useStakingContract hook
export type PoolProps = {
  id: number,
  duration: string;
  text: string;
  reward: string;
  stakeIds?: stakeDataInPoolDto[]
};