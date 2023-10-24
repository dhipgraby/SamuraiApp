export interface buyDto {
    nftPrice: string | null;
    mint: () => void;
    isLoading: boolean;
}

export interface mintYenDto {
    nftPrice: string | null;
    mint: () => void;
    isLoading: boolean;
    loadingAllowance: boolean;
    approveSpend: () => void;
    needAllowance: boolean;
}

