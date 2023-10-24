import { web3Address } from "@/dto/tokenDto"
import { SamuraiAbi } from "./abi/samuraiAbi"
import { YenAbi } from "./abi/yenAbi"
import { FaucetAbi } from "./abi/faucetAbi"
import { StakingAbi } from "./abi/tokenStakingPlatformAbi"
import { EscrowAbi } from "./abi/escrowAbi"

export const SAMURAI_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
export const YENTOKEN_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
export const FAUCET_ADDRESS = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
export const ADMIN_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
export const FEEMANAGEMENT_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"
export const STAKING_PLATFORM = "0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6"
export const ESCROW_ADDRESS = "0x0165878a594ca255338adfa4d48449f69242eb8f"

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
