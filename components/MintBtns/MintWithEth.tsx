import { useEffect } from "react";
import { toast } from "react-toastify";
import { buyDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useNftContract } from "@/hooks/useNftContract";

export default function MintWithEth({
    nftPrice,
    nftTokenPrice,
    tokenId,
    isMinted,
    setIsMinted,
    totalAllowance
}: buyDto) {

    //MINTING HOOKS
    const {
        loadingTxMint,
        isLoading,
        mint,
        isError,
        isErrorTxMint,
        isSuccess,
        isSuccessTxMint,
    } = useNftContract({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    //Success Mint
    useEffect(() => {

        if (isSuccess) {
            toast.success('Transaction sent for bloodline #:' + tokenId)
            setIsMinted(true)
            return
        }

        if (isSuccessTxMint) {
            toast.success('Transaction complete! Minted bloodline #:' + tokenId)
            setIsMinted(true)
            return
        }

    }, [isSuccess, isSuccessTxMint])

    useEffect(() => {
        if (isError || isErrorTxMint) toast.warn(`Mint error. Try again or contact support:  ${isError}`)
    }, [isError])

    return (
        <div>
            {nftPrice != null ? (
                <p>Price: <span className="text-yellow-400">{nftPrice} <FontAwesomeIcon icon={faEthereum} />
                </span>
                </p>
            ) :
                <p>Loading price...</p>
            }
            <button
                className={`bg-indigo-600 p-3 rounded-lg	text-white mt-2 w-full text-lg`}
                disabled={isLoading || loadingTxMint} onClick={() => mint()}>
                {(isLoading || loadingTxMint) ? "MINTING..." : "MINT NOW"} <FontAwesomeIcon icon={faEthereum} />
            </button>
        </div>
    );

}
