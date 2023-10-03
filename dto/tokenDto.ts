export type web3Address = `0x${string}`

export type Address = `0x${string}` | undefined;

export interface readContractDto {
    address: `0x${string}` | undefined,
    abi: any[]
}

export interface YenToken {
    totalSupply: number;
    currentSupply: number;
}

export interface FaucetProps {
    faucetAddress: `0x${string}` | undefined;
    tokenAddress: `0x${string}` | undefined;
    faucetAbi: any[];
    tokenAbi: any[];
}
