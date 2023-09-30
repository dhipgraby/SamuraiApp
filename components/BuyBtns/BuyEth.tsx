import { buyDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons"

export default function BuyEth({
    nftPrice,
    isLoading,
    mint,
}: buyDto) {
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
                disabled={isLoading} onClick={() => mint()}>
                {isLoading ? "MINTING..." : "MINT NOW"} <FontAwesomeIcon icon={faEthereum} />
            </button>
        </div>
    );

}
