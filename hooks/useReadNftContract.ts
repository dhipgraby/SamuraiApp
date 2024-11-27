import { useMemo } from "react";
import { useReadContract } from "wagmi";
import { samuraiContract } from "@/contracts/contractData";

export function useReadNftContract({ tokenId }: { tokenId: number }) {
    const { data: initialPriceData, refetch: refetchInitialPrice } = useReadContract({
        ...samuraiContract,
        functionName: 'initialPrice',
        query: {
            enabled: true
        }
    });

    const { data: initialTokenPriceData, refetch: refetchInitialTokenPrice } = useReadContract({
        ...samuraiContract,
        functionName: 'initialTokenPrice',
        query: {
            enabled: true
        }
    });

    const { data: _ownerOfData, refetch: refetchownerOf } = useReadContract({
        ...samuraiContract,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
        query: {
            enabled: true,
            // onSettled logic is no longer directly supported
        }
    });

    const ownerOfData = useMemo(() => {
        return Boolean(_ownerOfData);
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