import { useEffect } from "react";
import { toast } from "sonner";
import { buyDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useNftContract } from "@/hooks/useNftContract";
import { userStore } from "@/store/user";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

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

    const userEthBalance = userStore((state) => state.ethBalance);

    //Success Mint
    useEffect(() => {

        if (isSuccessTxMint) {
            toast.success('Transaction complete! Minted bloodline #' + tokenId)
            setIsMinted(true)
            return;
        }

        if (isSuccess) {
            toast.success('Transaction sent for bloodline #' + tokenId)
            return;
        }
        //eslint-disable-next-line
    }, [isSuccess, isSuccessTxMint])

    useEffect(() => {
        if (isError || isErrorTxMint) toast.warning(`Mint error. Try again or contact support:  ${isError}`)
        //eslint-disable-next-line
    }, [isError])

    return (
        <div className="mt-4">
            {nftPrice != null ? (
                <p>Price: <span className="text-yellow-400">{nftPrice} <FontAwesomeIcon icon={faEthereum} />
                </span>
                </p>
            ) :
                <p>Loading price...</p>
            }
            {(Number(userEthBalance) < Number(nftPrice)) ?
                <p className="opacity-80 text-red-300 my-2 bg-black p-2 border-2 border-gray-500 rounded-lg"><FontAwesomeIcon icon={faExclamationCircle} /> Not enough Eth to mint</p>
                :
                <button
                    className={`bg-indigo-600 p-3 rounded-lg	text-white mt-2 w-full text-lg`}
                    disabled={isLoading || loadingTxMint} onClick={() => mint()}>
                    {(isLoading || loadingTxMint) ? "MINTING..." : "MINT NOW"} <FontAwesomeIcon icon={faEthereum} />
                </button>
            }

        </div>
    );

}
