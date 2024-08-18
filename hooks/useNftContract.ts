import { useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useNftProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { toast } from "sonner";
import { chainId } from "@/contracts/contractData";

export function useNftContract({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftProps) {

    // const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    // ---------------------   WRITE FUNCTIONS ------------------------
    const {
        mintConfig,
        tokenMintConfig
    } = useMintConfig({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    //Mint NFT with ETH
    const {
        data: submitMintData,
        isLoading,
        isError,
        isSuccess,
        write: minNft } = useContractWrite(mintConfig)

    //Mint NFT with YEN TOKEN
    const {
        data: submitMintWithToken,
        isLoading: loadingMintWithToken,
        isError: errorMintWithToken,
        isSuccess: successMintWithToken,
        write: mintNftWithToken } = useContractWrite(tokenMintConfig)

    //Set ERC20 token to mint from
    // const { write: setTokenContract } = useContractWrite(setTokenConfig)

    // ---------------------   WAIT FOR TXS ------------------------

    //Wait Nft mint with Eth transaction
    const {
        isLoading: loadingTxMint,
        isSuccess: isSuccessTxMint,
        error: isErrorTxMint
    } = useWaitForTransaction({
        chainId: chainId,
        confirmations: 1,
        cacheTime: Infinity,
        hash: submitMintData?.hash
    });

    //Wait for Yen Token mint transaction
    const {
        isLoading: loadingTxMintWithToken,
        isSuccess: isSuccessTxMintWithToken,
        error: isErrorTxMintWithToken } = useWaitForTransaction({
            chainId: chainId,
            confirmations: 1,
            cacheTime: Infinity,
            hash: submitMintWithToken?.hash
        });


    async function mint() {
        try {
            console.log('minting');
            minNft?.()
        } catch (error) {
            console.log('mint fail: ', error);
            toast.warning("Error minting. Try again or contact support")
        }
    }

    async function mintWithToken() {
        try {
            mintNftWithToken?.()
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
        //Mint with Yen token
        loadingMintWithToken,
        successMintWithToken,
        errorMintWithToken,
        mintWithToken,
        loadingTxMintWithToken,
        isSuccessTxMintWithToken,
        isErrorTxMintWithToken,
    };
}