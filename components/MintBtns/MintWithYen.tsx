import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNftContract } from "@/hooks/useNftContract";
import { mintYenDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { useAllowance } from "@/hooks/useAllowance";

export default function MintWithYen({
    nftPrice,
    nftTokenPrice,
    tokenId,
    isMinted,
    setIsMinted,
    totalAllowance,
    needAllowance,
    setNeedAllowance,
    setTotalAllowance
}: mintYenDto) {

    const {
        loadingMintWithToken,
        successMintWithToken,
        errorMintWithToken,
        mintWithToken,
        loadingTxMintWithToken,
        isSuccessTxMintWithToken,
        isErrorTxMintWithToken,
    } = useNftContract({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

    const {
        loadingAllowance,
        successAllowance,
        errorAllowance,
        submitTxAllowanceSuccess,
        submitTxAllowanceLoading,
        submitTxAllowanceError,
        approveSpend
    } = useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })


    //Success Mint
    useEffect(() => {

        if (successMintWithToken) {
            toast.success('Transaction sent for bloodline #:' + tokenId)
            setIsMinted(true)
            return
        }

        if (isSuccessTxMintWithToken) {
            toast.success('Transaction complete! Minted bloodline #:' + tokenId)
            setIsMinted(true)
            return
        }

    }, [successMintWithToken, isSuccessTxMintWithToken])


    //Mint Error handling
    useEffect(() => {
        if (errorMintWithToken || isErrorTxMintWithToken) toast.warn(`Mint error. Try again or contact support:  ${errorMintWithToken}`)
    }, [errorMintWithToken, isErrorTxMintWithToken])

    // Success Allowance
    useEffect(() => {
        if (submitTxAllowanceSuccess) {
            toast.success('Approval success, ready to mint with Yen token')
            setNeedAllowance(false)
            setTotalAllowance(nftTokenPrice)
            return
        }

        if (successAllowance) {
            toast.success('Approving contract...')
            setNeedAllowance(false)
            setTotalAllowance(nftTokenPrice)
            return
        }

    }, [successAllowance, submitTxAllowanceSuccess])

    // Allowance error handling
    useEffect(() => {
        if (errorAllowance || submitTxAllowanceError) toast.warn('Approval error. Try again or contact support')
    }, [errorAllowance, submitTxAllowanceError])


    return (
        <div className="mt-4">
            {nftPrice != null ? (
                <p>Price: <span className="text-yellow-400">
                    {parseInt(nftPrice)} <FontAwesomeIcon icon={faYenSign} />
                </span></p>
            ) :
                <p>Loading price...</p>
            }

            {(needAllowance)
                ?
                <button
                    className={`bg-white text-black p-3 rounded-lg mt-2 w-full text-lg`}
                    disabled={loadingAllowance}
                    onClick={() => approveSpend()}
                >
                    {(loadingAllowance || submitTxAllowanceLoading) ? "APPROVING..." : "APPROVE"} <FontAwesomeIcon icon={faYenSign} />
                </button>
                :
                <button
                    className={`bg-white text-black p-3 rounded-lg mt-2 w-full text-lg`}
                    disabled={loadingMintWithToken || loadingTxMintWithToken}
                    onClick={() => mintWithToken()}
                >
                    {(loadingMintWithToken || loadingTxMintWithToken) ? "MINTING..." : "MINT NOW"} <FontAwesomeIcon icon={faYenSign} />
                </button>
            }
        </div>
    );

}
