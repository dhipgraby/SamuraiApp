import { useState } from "react";
import { useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
import { useNftProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { toast } from "react-toastify"
import { web3Address } from "@/dto/tokenDto";
import { userStore } from "@/store/user";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import useDebounce from "./useDebounce";

export function useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftProps) {

    // const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    const userAddress = userStore((state) => state.address)

    // ---------------------   CONFIG ------------------------
    const {
        allowanceConfig
    } = useMintConfig({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: allowanceData, refetch: refetchAllowance } = useContractRead(
        {
            ...tokenContract,
            functionName: 'allowance',
            args: [userAddress as web3Address, samuraiContract.address as web3Address]
        }
    );

    // ---------------------   WRITE FUNCTIONS ------------------------

    //Token Allowance
    const {
        data: submitTxDataAllowance,
        error: submitTxAllowanceError,
        isLoading: loadingAllowance,
        isError: errorAllowance,
        isSuccess: successAllowance,
        write: approve } = useContractWrite(allowanceConfig)

    // ---------------------   WAIT FOR TXS ------------------------

    //Wait for alloance approval
    const {
        isLoading: submitTxAllowanceLoading,
        isSuccess: submitTxAllowanceSuccess,
        error: submitConfirmTxAllowanceError
    } = useWaitForTransaction({
        chainId: 31337,
        confirmations: 1,
        cacheTime: Infinity,
        hash: submitTxDataAllowance?.hash
    });

    // ---------------------   FUNCTIONS ------------------------

    async function approveSpend() {
        try {
            console.log('approving');
            approve?.()
        } catch (error) {
            console.log('approve fail: ', error);
            toast.warn("Error approving. Try again or contact support")
        }
    }

    return {
        allowanceData,
        refetchAllowance,
        loadingAllowance,
        successAllowance,
        errorAllowance,
        approveSpend,
        // wait txs
        submitTxDataAllowance,
        submitTxAllowanceLoading,
        submitTxAllowanceSuccess,
        submitTxAllowanceError
    };
}