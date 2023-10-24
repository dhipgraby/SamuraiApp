import { useMemo } from "react";
import { useContractReads, useContractRead } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { web3Address } from "@/dto/tokenDto";
import { userStore } from "@/store/user";

export function useReadNftContract({ tokenId }: { tokenId: number }) {

    const userAddress = userStore((state) => state.address)

    // ---------------------   READ FUNCTIONS ------------------------
    const { data: allowanceData, refetch: refetchAllowance } = useContractRead(
        {
            ...tokenContract,
            functionName: 'allowance',
            args: [userAddress as web3Address, samuraiContract.address as web3Address]
        }
    );

    const { data: initialPriceData, refetch: refetchInitialPrice } = useContractRead(
        {
            ...samuraiContract,
            functionName: 'initialPrice',
        }
    )

    const { data: initialTokenPriceData, refetch: refetchInitialTokenPrice } = useContractRead(
        {
            ...samuraiContract,
            functionName: 'initialTokenPrice',
        }
    )

    const { data: _ownerOfData, refetch: refetchownerOf } = useContractRead(
        {
            ...samuraiContract,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
            onSettled(data, error) {
                if (data) return true
                if (error) return false
            }
        }
    )

    const ownerOfData = useMemo(() => {
        return _ownerOfData ? true : false;
    }, [_ownerOfData]);

    return {
        allowanceData,
        refetchAllowance,
        initialPriceData,
        refetchInitialPrice,
        initialTokenPriceData,
        refetchInitialTokenPrice,
        ownerOfData,
        refetchownerOf
    };
}