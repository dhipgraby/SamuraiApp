import { useState } from "react";
import { useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
import { useNFTProps } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";
import { ethers } from "ethers";
import { toast } from "react-toastify"
import useDebounce from "./useDebounce";
import { web3Address } from "@/dto/tokenDto";
import { userStore } from "@/store/user";
import { samuraiContract, tokenContract } from "@/contracts/contractData";

export function useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNFTProps) {

    const [amount, setAmount] = useState('0')
    const debouncedAmount = useDebounce(ethers.parseEther(amount), 1000);

    const userAddress = userStore((state) => state.address)

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: allowanceData, refetch: refetchAllowance } = useContractRead(
        {
            ...tokenContract,
            functionName: 'allowance',
            args: [userAddress as web3Address, samuraiContract.address as web3Address]
        }
    );

    // ---------------------   CONFIG ------------------------
    const {
        allowanceConfig
    } = useMintConfig({ tokenId, amount: debouncedAmount, nftPrice, nftTokenPrice, totalAllowance, isMinted })

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
            console.log('mint fail: ', error);
            toast.warn("Error minting. Try again or contact support")
        }
    }

    return {
        allowanceData,
        refetchAllowance,
        loadingAllowance,
        successAllowance,
        errorAllowance,
        approveSpend,
        setAmount,
        // wait txs
        submitTxDataAllowance,
        submitTxAllowanceLoading,
        submitTxAllowanceSuccess,
        submitTxAllowanceError
    };
}