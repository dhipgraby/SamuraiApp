import { useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useNFTProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { ethers } from "ethers";
import { toast } from "react-toastify"
import useDebounce from "./useDebounce";

export function useNftContract({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNFTProps) {

    const [amount, setAmount] = useState('0')
    const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    // ---------------------   WRITE FUNCTIONS ------------------------
    const {
        mintConfig,
        tokenMintConfig
    } = useMintConfig({ tokenId, amount: debouncedAmount, nftPrice, nftTokenPrice, totalAllowance, isMinted })

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
        chainId: 31337,
        confirmations: 1,
        cacheTime: Infinity,
        hash: submitMintData?.hash
    });

    //Wait for Yen Token mint transaction
    const {
        isLoading: loadingTxMintWithToken,
        isSuccess: isSuccessTxMintWithToken,
        error: isErrorTxMintWithToken } = useWaitForTransaction({
            chainId: 31337,
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
            toast.warn("Error minting. Try again or contact support")
        }
    }

    async function mintWithToken() {
        try {
            console.log('minting usin yen');
            console.log('mintNftWithToken', mintNftWithToken);

            mintNftWithToken?.()
        } catch (error) {
            console.log('mint with yen fail: ', error);
            toast.warn("Error minting. Try again or contact support")
        }
    }

    return {
        isLoading,
        isSuccess,
        isError,
        mint,
        setAmount,
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