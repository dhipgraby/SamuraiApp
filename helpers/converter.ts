import { ethers } from "ethers"

export function parseAmount(amount: any) {
    return parseFloat(ethers.formatEther(amount.toString())).toLocaleString()
}

export function shortAddr(str: string) {
    if (str.length <= 8) {
        return str;  // Return original string if it's short.
    }

    const firstFour = str.substring(0, 4);
    const lastFour = str.substring(str.length - 4);

    return `${firstFour}...${lastFour}`;
}
