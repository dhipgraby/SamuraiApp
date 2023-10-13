import { ethers } from "ethers"

export function parseAmount(amount: any) {
    return parseInt(ethers.formatEther(amount.toString())).toLocaleString()
}