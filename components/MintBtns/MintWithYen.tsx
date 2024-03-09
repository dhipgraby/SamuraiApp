import { mintYenDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";

export default function MintWithYen({
    nftPrice,
    isLoading,
    loadingAllowance,
    mint,
    approveSpend,
    needAllowance,
    submitTxAllowanceLoading,
    loadingTxMintWithToken,
    loadingTxMint
}: mintYenDto) {
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
                    disabled={isLoading || loadingTxMint || loadingTxMintWithToken}
                    onClick={() => mint()}
                >
                    {(isLoading || loadingTxMintWithToken || loadingTxMint) ? "MINTING..." : "MINT NOW"} <FontAwesomeIcon icon={faYenSign} />
                </button>
            }
        </div>
    );

}
