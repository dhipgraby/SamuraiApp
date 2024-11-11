import { useState } from "react";
import { useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
import { useNftProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { web3Address } from "@/dto/tokenDto";
import { chainId, samuraiContract, tokenContract } from "@/contracts/contractData";
import useDebounce from "./useDebounce";
import { useUserAddress } from "@/queries/user.queries";

export function useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftProps) {

    // const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    const {data } = useUserAddress();
    const userAddress = data as web3Address;

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
        chainId: chainId,
        confirmations: 1,
        cacheTime: Infinity,
        hash: submitTxDataAllowance?.hash
    });

    // ---------------------   FUNCTIONS ------------------------
    return {
        allowanceData,
        refetchAllowance,
        loadingAllowance,
        successAllowance,
        errorAllowance,
        approve,
        // wait txs
        submitTxDataAllowance,
        submitTxAllowanceLoading,
        submitTxAllowanceSuccess,
        submitTxAllowanceError
    };
}