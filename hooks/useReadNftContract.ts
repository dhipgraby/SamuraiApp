import { useMemo } from "react";
import { useContractReads, useContractRead } from "wagmi";
import { samuraiContract } from "@/contracts/contractData";

export function useReadNftContract({ tokenId }: { tokenId: number }) {

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
        initialPriceData,
        refetchInitialPrice,
        initialTokenPriceData,
        refetchInitialTokenPrice,
        ownerOfData,
        refetchownerOf
    };
}