import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNftContract } from "@/hooks/useNftContract";
import { mintYenDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { useAllowance } from "@/hooks/useAllowance";
import { userStore } from "@/store/user";

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

    const tokenBalance = userStore((state) => state.tokenBalance);

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

        if (isSuccessTxMintWithToken) {
            toast.success('Transaction complete! Minted bloodline #:' + tokenId)
            setIsMinted(true)
            return
        }

        if (successMintWithToken) {
            toast.success('Transaction sent for bloodline #:' + tokenId)
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
            {nftTokenPrice != null ? (
                <p>Price: <span className="text-yellow-400">
                    {parseInt(nftTokenPrice)} <FontAwesomeIcon icon={faYenSign} />
                </span></p>
            ) :
                <p>Loading price...</p>
            }

            {(needAllowance)
                ?
                <>
                    {(Number(tokenBalance) < Number(nftTokenPrice)) &&
                        <p className="opacity-80 text-red-300 my-2 bg-black p-2 border-2 border-gray-500 rounded-lg">
                            <FontAwesomeIcon icon={faExclamationCircle} /> Not enough tokens to mint
                        </p>}
                    <button
                        className={`bg-white text-black p-3 rounded-lg mt-2 w-full text-lg`}
                        disabled={loadingAllowance}
                        onClick={() => approveSpend()}
                    >
                        {(loadingAllowance || submitTxAllowanceLoading) ? "APPROVING..." : "APPROVE"} <FontAwesomeIcon icon={faYenSign} />
                    </button>
                </>
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
