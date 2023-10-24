import { useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useNFTProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { ethers } from "ethers";
import useDebounce from "./useDebounce";

export function useNftContract({ tokenId, nftTokenPrice, totalAllowance,isMinted }: useNFTProps) {

    const [amount, setAmount] = useState('0')
    const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    // ---------------------   WRITE FUNCTIONS ------------------------
    const { mintConfig, tokenMintConfig, allowanceConfig } = useMintConfig({ tokenId, amount: debouncedAmount, nftTokenPrice, totalAllowance,isMinted })

    const { isLoading, isError, isSuccess, write: minNft } = useContractWrite(mintConfig)
    const { data: submitMintWithToken, isLoading: loadingTokenMint, isError: errorTokenMint, isSuccess: successTokenMint, write: minNftWithToken } = useContractWrite(tokenMintConfig)
    const { data: submitTxDataAllowance, error: submitTxAllowanceError, isLoading: loadingAllowance, isError: errorAllowance, isSuccess: successAllowance, write: approve } = useContractWrite(allowanceConfig)

    const { isLoading: submitTxAllowanceLoading, isSuccess: submitTxAllowanceSuccess, error: submitConfirmTxAllowanceError }
        = useWaitForTransaction({
            chainId: 31337,
            confirmations: 1,
            cacheTime: Infinity,
            hash: submitTxDataAllowance?.hash
        });

    const { isLoading: loadingTxMintWithToken, isSuccess: isSuccessTxMintWithToken, error: isErrorTxMintWithToken }
        = useWaitForTransaction({
            chainId: 31337,
            confirmations: 1,
            cacheTime: Infinity,
            hash: submitMintWithToken?.hash
        });

    return {
        isLoading,
        loadingTokenMint,
        loadingAllowance,
        isSuccess,
        successTokenMint,
        successAllowance,
        isError,
        errorTokenMint,
        errorAllowance,
        approve,
        minNft,
        minNftWithToken,
        setAmount,
        // wait txs
        submitTxDataAllowance,
        submitTxAllowanceLoading,
        submitTxAllowanceSuccess,
        loadingTxMintWithToken,
        isSuccessTxMintWithToken,
        isErrorTxMintWithToken
    };
}