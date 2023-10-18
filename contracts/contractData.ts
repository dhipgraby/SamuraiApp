import { web3Address } from "@/dto/tokenDto"
import SamuraiAbi from "./abi/samuraiAbi.json"
import YenAbi from "./abi/yenAbi.json"
import FaucetAbi from "./abi/faucetAbi.json"
import StakingAbi from "./abi/tokenStakingPlatformAbi.json"
import EscrowAbi from "./abi/escrowAbi.json"
import oneDayStakingContractAbi from '@/contracts/abi/oneDayStakingContractAbi.json';
import oneWeekStakingContractAbi from '@/contracts/abi/oneWeekStakingContractAbi.json';
import oneMonthStakingContractAbi from '@/contracts/abi/oneMonthStakingContractAbi.json';
import oneYearStakingContractAbi from '@/contracts/abi/oneYearStakingContractAbi.json';
import sixMonthStakingContractAbi from '@/contracts/abi/sixMonthStakingContractAbi.json';

export const SAMURAI_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
export const YENTOKEN_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
export const FAUCET_ADDRESS = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
export const ADMIN_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
export const FEEMANAGEMENT_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
export const STAKING_PLATFORM = "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6"
export const ESCROW_ADDRESS = "0x0165878a594ca255338adfa4d48449f69242eb8f"
export const ONEDAY_STAKING_ADDRESS = "0x0165878a594ca255338adfa4d48449f69242eb8f"
export const ONEWEEK_STAKING_ADDRESS = "0x610178da211fef7d417bc0e6fed39f05609ad788"
export const ONEMONTH_STAKING_ADDRESS = "0xb7f8bc63bbcad18155201308c8f3540b07f84f5e"
export const ONEYEAR_STAKING_ADDRESS = "0xa51c1fc2f0d1a1b8494ed1fe312d7c3a78ed91c0"
export const SIXMONTH_STAKING_ADDRESS = "0x0dcd1bf9a1b36ce34237eeafef220932846bcd82"

export const samuraiContract = {
    address: SAMURAI_ADDRESS as web3Address,
    abi: SamuraiAbi as any
}

export const faucetContract = {
    address: FAUCET_ADDRESS as web3Address,
    abi: FaucetAbi as any
}

export const tokenContract = {
    address: YENTOKEN_ADDRESS as web3Address,
    abi: YenAbi as any
}

export const stakingPlatformContract = {
    address: STAKING_PLATFORM as web3Address,
    abi: StakingAbi as any,
};

export const escrowContract = {
    address: ESCROW_ADDRESS as web3Address,
    abi: EscrowAbi as any,
};

export const oneDayContract = {
    address: ONEDAY_STAKING_ADDRESS as web3Address,
    abi: oneDayStakingContractAbi as any,
};

export const oneWeekContract = {
    address: ONEWEEK_STAKING_ADDRESS as web3Address,
    abi: oneWeekStakingContractAbi as any,
};

export const oneMonthContract = {
    address: ONEMONTH_STAKING_ADDRESS as web3Address,
    abi: oneMonthStakingContractAbi as any,
};

export const oneYearContract = {
    address: ONEYEAR_STAKING_ADDRESS as web3Address,
    abi: oneYearStakingContractAbi as any,
};

export const sixMonthContract = {
    address: SIXMONTH_STAKING_ADDRESS as web3Address,
    abi: sixMonthStakingContractAbi as any,
};
