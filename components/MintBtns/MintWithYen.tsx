import { useEffect } from "react";
import { toast } from "sonner";
import { useNftContract } from "@/hooks/useNftContract";
import { mintYenDto } from "@/dto/buyDto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { useAllowance } from "@/hooks/useAllowance";
import { useUserBalances } from "@/queries/user.queries";
import { useUserAddress } from "@/queries/user.queries";

interface BalanceQuery {
  userBalance: string;
  ethBalance: string;
}

export default function MintWithYen({
  nftPrice,
  nftTokenPrice,
  tokenId,
  isMinted,
  setIsMinted,
  totalAllowance,
  needAllowance,
  setNeedAllowance,
  setTotalAllowance,
}: mintYenDto) {
  const { data } = useUserBalances();
  const { data: address } = useUserAddress();
  const userBalance = data as BalanceQuery;
  const tokenBalance = userBalance?.userBalance;
  const {
    loadingMintWithToken,
    successMintWithToken,
    errorMintWithToken,
    mintWithToken,
    loadingTxMintWithToken,
    isSuccessTxMintWithToken,
    isErrorTxMintWithToken,
  } = useNftContract({
    tokenId,
    nftPrice,
    nftTokenPrice,
    totalAllowance,
    isMinted,
  });

  const {
    refetchAllowance,
    loadingAllowance,
    successAllowance,
    errorAllowance,
    submitTxAllowanceSuccess,
    submitTxAllowanceLoading,
    submitTxAllowanceError,
    approve,
  } = useAllowance({
    tokenId,
    nftPrice,
    nftTokenPrice,
    totalAllowance,
    isMinted,
  });

  useEffect(() => {
    refetchAllowance();
  }, [address]);

  async function approveSpend() {
    try {
      approve?.();
    } catch (error) {
      console.log("approve fail: ", error);
      toast.warning("Error approving. Try again or contact support");
    }
  }

  //Success Mint
  useEffect(() => {
    if (isSuccessTxMintWithToken) {
      toast.success("Transaction complete! Minted bloodline #" + tokenId);
      refetchAllowance();
      setIsMinted(true);
      const response = fetch("http://localhost:3003/nfts/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nftId: tokenId, owner: address, token: "YEN" }),
      });
      console.log("response", response);

      return;
    }

    if (successMintWithToken) {
      toast.info("Transaction sent for bloodline #" + tokenId);
      return;
    }
    //eslint-disable-next-line
  }, [successMintWithToken, isSuccessTxMintWithToken]);

  //Mint Error handling
  useEffect(() => {
    if (errorMintWithToken || isErrorTxMintWithToken)
      if (isErrorTxMintWithToken?.message.includes("User rejected"))
        toast.error("User Rejected transaction");
      else toast.warning(`Mint error. Try again or contact support`);
  }, [errorMintWithToken, isErrorTxMintWithToken]);

  // Success Allowance
  useEffect(() => {
    if (submitTxAllowanceSuccess) {
      toast.success("Approval success, ready to mint with Yen token");
      refetchAllowance();
      return;
    }

    if (successAllowance) toast.info("Approving contract...");

    //eslint-disable-next-line
  }, [successAllowance, submitTxAllowanceSuccess]);

  // Allowance error handling
  useEffect(() => {
    if (errorAllowance || submitTxAllowanceError)
      if (submitTxAllowanceError?.message.includes("User rejected"))
        toast.error("User Rejected transaction");
      else toast.warning("Approval error. Try again or contact support");
  }, [errorAllowance, submitTxAllowanceError]);

  return (
    <div className="mt-4">
      {nftTokenPrice != null ? (
        <p>
          Price:{" "}
          <span className="text-yellow-400">
            {parseInt(nftTokenPrice)} <FontAwesomeIcon icon={faYenSign} />
          </span>
        </p>
      ) : (
        <p>Loading price...</p>
      )}

      {needAllowance ? (
        <>
          {Number(tokenBalance) < Number(nftTokenPrice) && (
            <p className="opacity-80 text-red-300 my-2 bg-black p-2 border-2 border-gray-500 rounded-lg">
              <FontAwesomeIcon icon={faExclamationCircle} /> Not enough tokens
              to mint
            </p>
          )}
          <button
            className={`bg-white text-black p-3 rounded-lg mt-2 w-full text-lg ${
              loadingAllowance || submitTxAllowanceLoading ? "bg-slate-400" : ""
            }`}
            disabled={loadingAllowance || submitTxAllowanceLoading}
            onClick={() => approveSpend()}
          >
            {loadingAllowance || submitTxAllowanceLoading
              ? "APPROVING..."
              : "APPROVE"}{" "}
            <FontAwesomeIcon icon={faYenSign} />
          </button>
        </>
      ) : (
        <button
          className={`bg-white text-black p-3 rounded-lg mt-2 w-full text-lg ${
            loadingMintWithToken || loadingTxMintWithToken ? "bg-slate-400" : ""
          }`}
          disabled={loadingMintWithToken || loadingTxMintWithToken}
          onClick={() => mintWithToken()}
        >
          {loadingMintWithToken || loadingTxMintWithToken
            ? "MINTING..."
            : "MINT NOW"}{" "}
          <FontAwesomeIcon icon={faYenSign} />
        </button>
      )}
    </div>
  );
}
