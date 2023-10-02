export interface readContractDto {
    address: `0x${string}` | undefined,
    abi: any[]
}

export interface YenToken {
    totalSupply: number;
    currentSupply: number;
}
