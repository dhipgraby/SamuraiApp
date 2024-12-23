import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { toast } from "sonner";
import { useFaucetContract } from "@/hooks/useFaucetContract";
import { useReadFaucetContract } from "@/hooks/useReadFaucetContract";
import { useUser } from "@/hooks/userHook";
import { parseAmount } from "@/helpers/converter";
import CountdownTimer from "./CountDownTimer";
import YenIcon from "../YenIcon";
import { useUserAddress, useUserBalances } from "@/queries/user.queries";
// import TxListener from "@/contracts/functions/txListener";
import ConnectWalletBtn from "../ConnectWalletBtn";

interface BalanceQuery {
  userBalance: string;
  ethBalance: string;
}

const MAX_RETRY_COUNT = 10; // Max retries
const RETRY_DELAY = 2000; // When try to refetch transaction submited

export default function ClaimBtn() {
  // const listener = new TxListener()
  const [retryCount, setRetryCount] = useState(0);
  const [claimCooldown, setClaimCooldown] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [faucetCd, setFaucetCd] = useState(0);
  const [tokenReward, setTokenReward] = useState("");
  const [faucetBalance, setFaucetBalance] = useState("0");
  const [readyToClaim, setReadyToClaim] = useState(false);
  const [loadingCooldown, setLoadingCooldown] = useState(false);
  const { refetchUserBalance } = useUser();
  const { data: userAddress } = useUserAddress();
  const { data: userBalance } = useUserBalances();
  const userBalances = userBalance as BalanceQuery;

  const {
    FaucetClaim,
    successFaucetClaim,
    submitTxFaucetClaim,
    errorFaucetClaim,
    loadingClaim,
    loadingTxFaucetClaim,
    isSuccessTxFaucetClaim,
    isErrorTxFaucetClaim,
    refetchTxFaucetClaim,
  } = useFaucetContract({ readyToClaim });

  const {
    remainingTokens,
    refetchRemainingTokens,
    maxAmount,
    refetchLastAccessTime,
    loadingLastAccessTime,
    cooldownTime,
  } = useReadFaucetContract();

  async function claim() {
    try {
      FaucetClaim?.();
    } catch (error) {
      toast.warning("Claim error, try again or contact support");
    }
  }

  async function checkCooldown() {
    if (loadingCooldown) return;

    setLoadingCooldown(true);
    const userCD = await refetchLastAccessTime();
    const faucetCD = cooldownTime
      ? Number(cooldownTime.toString().replace("n", ""))
      : 300;
    const userCooldown = userCD.data
      ? parseInt(userCD.data.toString().replace("n", ""))
      : 0;
    const now = Math.floor(Date.now() / 1000);
    const calculation = userCooldown + Number(faucetCD) - now;
    //SET
    const isReady = calculation <= 0 ? true : false;

    setFaucetCd(faucetCD);
    setSecondsLeft(calculation);
    setClaimCooldown(userCooldown);
    setTimeout(() => {
      setReadyToClaim(isReady);
    }, 2000);

    setLoadingCooldown(false);
  }

  async function fetchFaucetBalance() {
    const refetch = await refetchRemainingTokens();
    const updatedFaucetBalance = parseAmount(refetch?.data?.toString());
    setFaucetBalance(updatedFaucetBalance);
  }

  useEffect(() => {
    fetchFaucetBalance();
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log("errorFaucetClaim ----> ", errorFaucetClaim);
  // }, [errorFaucetClaim]);
  //SET FAUCET DATA
  useEffect(() => {
    const reward = parseAmount(maxAmount);
    const balance = parseAmount(remainingTokens);
    setFaucetBalance(balance);
    setTokenReward(reward);
    console.log("Reward  and Balance", reward, balance);
    //eslint-disable-next-line
  }, [maxAmount, remainingTokens]);

  //CHECK USER COOLDOWN
  useEffect(() => {
    checkCooldown();
    //eslint-disable-next-line
  }, [userAddress]);

  useEffect(() => {
    if (isErrorTxFaucetClaim) {
      console.log("isErrorTxFaucetClaim", isErrorTxFaucetClaim);
      toast.info(
        "Transaction tracking error. Re-fetching current transaction, please wait..."
      );
      const timerId = setTimeout(async () => {
        if (retryCount < MAX_RETRY_COUNT) {
          setRetryCount(retryCount + 1);
          refetchTxFaucetClaim();
          // if (submitTxFaucetClaim) {
          //     await listener.getTransaction(submitTxFaucetClaim?.hash)
          // }
        } else {
          toast.warning("Max retry limit reached. Please try again later.");
        }
      }, RETRY_DELAY * (retryCount + 1)); // Exponential backoff for retry delay
      return () => clearTimeout(timerId); // Cleanup on component unmount
    }
    if (errorFaucetClaim) {
      if (
        errorFaucetClaim.message?.includes("User rejected") ||
        errorFaucetClaim.message?.includes("User denied") ||
        errorFaucetClaim.message?.includes("cancelled")
      ) {
        toast.error("Transaction was cancelled by user");
        return;
      }

      // Handle other errors
      toast.warning("Claim error, try again or contact support");
      console.error("Claim error:", errorFaucetClaim);
    }
  }, [
    errorFaucetClaim,
    isErrorTxFaucetClaim,
    refetchTxFaucetClaim,
    retryCount,
  ]);

  //SUCCESS CASE
  useEffect(() => {
    if (isSuccessTxFaucetClaim) {
      toast.success(`Claim success! + ${tokenReward}  YenTokens`);
      fetchFaucetBalance();
      refetchUserBalance();
      const claim = fetch("http://localhost:3003/nfts/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: userAddress, amount: tokenReward }),
      });
      console.log("claim", claim);

      checkCooldown();
      setRetryCount(0);
      return;
    }

    if (successFaucetClaim || submitTxFaucetClaim) {
      toast.info(`Claim transaction sent!`);

      return;
    }
    //eslint-disable-next-line
  }, [successFaucetClaim, isSuccessTxFaucetClaim, submitTxFaucetClaim]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        const now = Math.floor(Date.now() / 1000);
        const calculation = claimCooldown + faucetCd - now;
        setSecondsLeft(calculation);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      if (readyToClaim) return;
      checkCooldown();
    }
    //eslint-disable-next-line
  }, [secondsLeft]);

  return (
    <div>
      <div className="box">
        Faucet Balance : {faucetBalance} <YenIcon />
      </div>
      {userAddress ? (
        <div className="mt-4 text-center">
          {!loadingLastAccessTime ? (
            <>
              {secondsLeft > 0 && <CountdownTimer secondsLeft={secondsLeft} />}

              <button
                disabled={
                  loadingTxFaucetClaim ||
                  secondsLeft > 0 ||
                  !readyToClaim ||
                  loadingClaim ||
                  userBalances?.userBalance === "0"
                }
                className={`${
                  !readyToClaim ||
                  loadingCooldown ||
                  loadingTxFaucetClaim ||
                  loadingClaim ||
                  userBalances?.userBalance === "0"
                    ? "bg-zinc-400"
                    : "bg-yellow-400"
                } text-black p-3 font-bold rounded-lg text-lg px-5`}
                onClick={() => claim()}
              >
                {loadingTxFaucetClaim || loadingClaim ? (
                  "Getting reward..."
                ) : loadingCooldown ? (
                  "Loading data..."
                ) : !readyToClaim ? (
                  "Faucet in cooldown..."
                ) : userAddress && userBalances?.userBalance === "0" ? (
                  "Insufficient balance"
                ) : (
                  <span>
                    Claim {tokenReward} Yen Tokens{" "}
                    <FontAwesomeIcon icon={faRocket} />
                  </span>
                )}
              </button>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div className="ta-c mt-5 box">
          <h1 className="text-lg mb-3">Connect your wallet to claim</h1>
          <div className="w-fit">
            <ConnectWalletBtn />
          </div>
        </div>
      )}
    </div>
  );
}
