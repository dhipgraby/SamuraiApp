export interface buyDto {
    nftPrice: string;
    nftTokenPrice: string;
    tokenId: number;
    isMinted: boolean;
    setIsMinted: (minted: boolean) => void;
    totalAllowance: string;
}

export interface mintYenDto {
    nftPrice: string;
    nftTokenPrice: string;
    tokenId: number;
    isMinted: boolean;
    setIsMinted: (bool: boolean) => void;
    totalAllowance: string;
    needAllowance: boolean;
    setNeedAllowance: (bool: boolean) => void;
    setTotalAllowance: (amount: string) => void;
}
