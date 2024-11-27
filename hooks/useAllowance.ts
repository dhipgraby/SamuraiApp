import { useState } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useNftProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { web3Address } from "@/dto/tokenDto";
import { chainId, samuraiContract, tokenContract } from "@/contracts/contractData";
import useDebounce from "./useDebounce";
import { useUserAddress } from "@/queries/user.queries";

export function useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftProps) {
    const { data } = useUserAddress();
    const userAddress = data as web3Address;

    // ---------------------   CONFIG ------------------------
    const {
        allowanceRequest,
    } = useMintConfig({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract(
        {
            ...tokenContract,
            functionName: 'allowance',
            args: [userAddress as web3Address, samuraiContract.address as web3Address],
            query: {
                // Optional: add any query configuration if needed
            }
        }
    );

    // ---------------------   WRITE FUNCTIONS ------------------------
    const {
        data: submitTxDataAllowance,
        error: submitTxAllowanceError,
        isPending: loadingAllowance,
        isError: errorAllowance,
        isSuccess: successAllowance,
        writeContract: approve
    } = useWriteContract();

    // ---------------------   WAIT FOR TXS ------------------------
    const {
        isLoading: submitTxAllowanceLoading,
        isSuccess: submitTxAllowanceSuccess,
        error: submitConfirmTxAllowanceError
    } = useWaitForTransactionReceipt({
        chainId: chainId,
        confirmations: 1,
        hash: submitTxDataAllowance,
    });

    // Function to trigger approval with the prepared config
    const handleApprove = () => {
        if (allowanceRequest) {
            approve(allowanceRequest!.request);
        }
    };

    // ---------------------   FUNCTIONS ------------------------
    return {
        allowanceData,
        refetchAllowance,
        loadingAllowance,
        successAllowance,
        errorAllowance,
        approve: handleApprove,
        // wait txs
        submitTxDataAllowance,
        submitTxAllowanceLoading,
        submitTxAllowanceSuccess,
        submitTxAllowanceError,
        submitConfirmTxAllowanceError
    };
}