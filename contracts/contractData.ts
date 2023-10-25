import { web3Address } from "@/dto/tokenDto"
import { SamuraiAbi } from "./abi/samuraiAbi"
import { YenAbi } from "./abi/yenAbi"
import { FaucetAbi } from "./abi/faucetAbi"
import { StakingAbi } from "./abi/tokenStakingPlatformAbi"
import { EscrowAbi } from "./abi/escrowAbi"

// export const SAMURAI_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
// export const YENTOKEN_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
// export const FAUCET_ADDRESS = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
// export const ADMIN_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
// export const FEEMANAGEMENT_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
// export const STAKING_PLATFORM = "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6"
// export const ESCROW_ADDRESS = "0x0165878a594ca255338adfa4d48449f69242eb8f"

export const SAMURAI_ADDRESS = "0xF6C771A6b51Be4ce21304E6620d93F70cD486529"
export const YENTOKEN_ADDRESS = "0xd833a214Cca2aab6e8BD713560f0B7Eb8dA72704"
export const FAUCET_ADDRESS = "0xa729c43262D568D5dD6c8fB059914cD7dC1FeEFC"
export const ADMIN_ADDRESS = "0x2B96C34B875aC61c513328949bA479A0469AF6E0"
export const FEEMANAGEMENT_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
export const STAKING_PLATFORM = "0xeD102bAB87Fc4E2D21b0Dc59979E4685330a756C"
export const ESCROW_ADDRESS = "0x26be59f4A7dB89f1f082bbF0EFe9De41B78cDa86"
export const oneDayStaking = "0xf3e63F73d3BDC41741380F7D2CF717f233857E6B"
export const oneWeekStaking = "0x36487412a995E1835CeAFF2f6f191E645Da0e0be"
export const oneMonthStaking = "0xA0a96974C4b4496794564786578eea117c1537d9"
export const oneYearStaking = "0x8f50c625B5a107365e52EF8c291A0d21F6e671BB"
export const sixMonthStaking = "0xD241Bef340cA7ce6b964310528676A58A53bcF78"

export const samuraiContract = {
    address: SAMURAI_ADDRESS as web3Address,
    abi: SamuraiAbi
}

export const faucetContract = {
    address: FAUCET_ADDRESS as web3Address,
    abi: FaucetAbi
}

export const tokenContract = {
    address: YENTOKEN_ADDRESS as web3Address,
    abi: YenAbi
}

export const stakingPlatformContract = {
    address: STAKING_PLATFORM as web3Address,
    abi: StakingAbi,
};

export const escrowContract = {
    address: ESCROW_ADDRESS as web3Address,
    abi: EscrowAbi,
};
