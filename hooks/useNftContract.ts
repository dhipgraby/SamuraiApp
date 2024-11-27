import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useNftProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { toast } from "sonner";
import { chainId } from "@/contracts/contractData";

export function useNftContract({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftProps) {
    const {
        mintRequest,
        tokenMintRequest,
    } = useMintConfig({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    // Mint NFT with ETH
    const {
        data: submitMintData,
        isPending: isLoading,
        isError,
        isSuccess,
        writeContract: minNft 
    } = useWriteContract()

    // Mint NFT with YEN TOKEN
    const {
        data: submitMintWithToken,
        isPending: loadingMintWithToken,
        isError: errorMintWithToken,
        isSuccess: successMintWithToken,
        writeContract: mintNftWithToken 
    } = useWriteContract()

    // Wait for NFT mint with Eth transaction
    const {
        isLoading: loadingTxMint,
        isSuccess: isSuccessTxMint,
        error: isErrorTxMint
    } = useWaitForTransactionReceipt({
        chainId,
        confirmations: 1,
        query: { 
            enabled: !!submitMintData,
        },
        hash: submitMintData
    });

    // Wait for Yen Token mint transaction
    const {
        isLoading: loadingTxMintWithToken,
        isSuccess: isSuccessTxMintWithToken,
        error: isErrorTxMintWithToken 
    } = useWaitForTransactionReceipt({
        chainId,
        confirmations: 1,
        query: { 
            enabled: !!submitMintWithToken,
        },
        hash: submitMintWithToken
    });

    async function mint() {
        try {
            console.log('minting');
            minNft(mintRequest!.request)
        } catch (error) {
            console.log('mint fail: ', error);
            toast.warning("Error minting. Try again or contact support")
        }
    }

    async function mintWithToken() {
        try {
            mintNftWithToken(tokenMintRequest!.request)
        } catch (error) {
            console.log('mint with yen fail: ', error);
            toast.warning("Error minting. Try again or contact support")
        }
    }

    return {
        isLoading,
        isSuccess,
        isError,
        mint,
        loadingTxMint,
        isSuccessTxMint,
        isErrorTxMint,
        // Mint with Yen token
        loadingMintWithToken,
        successMintWithToken,
        errorMintWithToken,
        mintWithToken,
        loadingTxMintWithToken,
        isSuccessTxMintWithToken,
        isErrorTxMintWithToken,
    };
}