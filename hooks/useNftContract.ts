import { usePrepareContractWrite, useContractWrite, useContractReads } from "wagmi";
import { samuraiContract } from "@/contracts/contractData";
import { ethers } from "ethers";

export function useNftContract({ tokenId }: { tokenId: number }) {


    // ---------------------   WRITE FUNCTIONS ------------------------

    const { config } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMint',
        args: [tokenId],
        value: ethers.parseEther("0.19"),
    })

    const { isLoading, isError, isSuccess, write: minNft } = useContractWrite(config)

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: nftPrices } = useContractReads({
        contracts: [
            {
                ...samuraiContract,
                functionName: 'initialPrice',
            },
            {
                ...samuraiContract,
                functionName: 'initialTokenPrice',
            },
        ],
    });

    return {
        nftPrices,
        isLoading,
        isSuccess,
        isError,
        minNft
    };
}