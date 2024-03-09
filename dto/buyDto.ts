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
    mint: () => void;
    isLoading: boolean;
    loadingAllowance: boolean;
    approveSpend: () => void;
    needAllowance: boolean;
    submitTxAllowanceLoading: boolean;
    loadingTxMintWithToken: boolean;
    loadingTxMint: boolean;
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
