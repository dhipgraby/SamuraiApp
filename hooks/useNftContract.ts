import { usePrepareContractWrite, useContractWrite, useContractReads } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { ethers } from "ethers";
import { handlePrepareMintError } from "@/helpers/txHelper";
import { userStore } from "@/store/user";
import { web3Address } from "@/dto/tokenDto";
import { useMintConfig } from "./config/mintConfig";

export function useNftContract({ tokenId, setErrorMsg, amount }: { tokenId: number, setErrorMsg: (msg: string) => void, amount: string }) {

    const userAddress = userStore((state) => state.address)

    // ---------------------   WRITE FUNCTIONS ------------------------
    const { mintConfig, tokenMintConfig, allowanceConfig } = useMintConfig({ tokenId, setErrorMsg, amount })

    const { isLoading, isError, isSuccess, write: minNft } = useContractWrite(mintConfig)
    const { isLoading: loadingTokenMint, isError: errorTokenMint, isSuccess: successTokenMint, write: minNftWithToken } = useContractWrite(tokenMintConfig)
    const { isLoading: loadingAllowance, isError: errorAllowance, isSuccess: successAllowance, write: approve } = useContractWrite(allowanceConfig)

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: nftData } = useContractReads({
        contracts: [
            {
                ...samuraiContract,
                functionName: 'initialPrice',
            },
            {
                ...samuraiContract,
                functionName: 'initialTokenPrice',
            },
            {
                ...samuraiContract,
                functionName: 'ownerOf',
                args: [tokenId],
            },
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [userAddress as web3Address, samuraiContract.address as web3Address]
            },
        ],
    });

    return {
        nftData,
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
        minNftWithToken
    };
}