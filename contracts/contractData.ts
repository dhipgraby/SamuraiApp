import { web3Address } from "@/dto/tokenDto"
import SamuraiAbi from "./abi/samuraiAbi.json"
import YenAbi from "./abi/yenAbi.json"
import FaucetAbi from "./abi/faucetAbi.json"

export const SAMURAI_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
export const YENTOKEN_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
export const FAUCET_ADDRESS = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"
export const ADMIN_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
export const FEEMANAGEMENT_ADDRESS = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"

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