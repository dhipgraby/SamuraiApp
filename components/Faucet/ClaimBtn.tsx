import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { toast } from 'react-toastify'
import { useFaucetContract } from "@/hooks/useFaucetContract";
import { useReadFaucetContract } from "@/hooks/useReadFaucetContract";
import { useUser } from '@/hooks/userHook'
import { parseAmount } from "@/helpers/converter";
import { userStore } from "@/store/user";
import CountdownTimer from "./CountDownTimer";
import YenIcon from "../YenIcon";
import TxListener from "@/contracts/functions/txListener";
import ConnectWalletBtn from "../ConnectWalletBtn";

export default function ClaimBtn() {

    const listener = new TxListener()

    const [claimCooldown, setClaimCooldown] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [faucetCd, setFaucetCd] = useState(0);
    const [tokenReward, setTokenReward] = useState('');
    const [faucetBalance, setFaucetBalance] = useState('0');
    const [readyToClaim, setReadyToClaim] = useState(false);
    const [loadingCooldown, setLoadingCooldown] = useState(false);

    const { updateUserBalance } = useUser()
    const userAddress = userStore((state: any) => state.address)

    const {
        FaucetClaim,
        successFaucetClaim,
        errorFaucetClaim,
        loadingClaim,
        loadingTxFaucetClaim,
        isSuccessTxFaucetClaim,
        isErrorTxFaucetClaim,
        refetchTxFaucetClaim,
        submitTxFaucetClaim,
    } = useFaucetContract({ readyToClaim });

    const {
        remainingTokens,
        refetchRemainingTokens,
        maxAmount,
        refetchLastAccessTime,
        loadingLastAccessTime,
        cooldownTime
    } = useReadFaucetContract()

    async function claim() {
        try {
            FaucetClaim?.()
        } catch (error) {
            toast.warn('Claim error, try again or contact support')
        }
    }

    async function checkCooldown() {

        if (loadingCooldown) return;

        setLoadingCooldown(true)
        const userCD = await refetchLastAccessTime()
        const faucetCD = cooldownTime ? Number(cooldownTime.toString().replace('n', '')) : 300;
        const userCooldown = (userCD.data) ? parseInt(userCD.data.toString().replace('n', '')) : 0;
        const now = Math.floor(Date.now() / 1000);
        const calculation = (userCooldown + Number(faucetCD)) - now;
        //SET 
        const isReady = (calculation <= 0) ? true : false;

        setFaucetCd(faucetCD)
        setSecondsLeft(calculation)
        setClaimCooldown(userCooldown)
        setTimeout(() => {
            setReadyToClaim(isReady)
        }, 2000)

        setLoadingCooldown(false)

    }

    async function fetchFaucetBalance() {
        const refetch = await refetchRemainingTokens()
        const updatedFaucetBalance = parseAmount(refetch?.data?.toString())
        setFaucetBalance(updatedFaucetBalance)
    }

    useEffect(() => {
        console.log('errorFaucetClaim ----> ', errorFaucetClaim)
    }, [errorFaucetClaim])

    //SET FAUCET DATA
    useEffect(() => {
        const reward = parseAmount(maxAmount);
        const balance = parseAmount(remainingTokens)
        setFaucetBalance(balance)
        setTokenReward(reward)
    }, [])

    //CHECK USER COOLDOWN
    useEffect(() => {
        checkCooldown()
    }, [userAddress])

    //ERROR CASE
    useEffect(() => {
        if (submitTxFaucetClaim) console.log("submitTxFaucetClaim", submitTxFaucetClaim);
        if (isErrorTxFaucetClaim) {
            toast.info('Transaction track error. Refreshing current transactions...')
            setTimeout(async () => {
                refetchTxFaucetClaim()
                if (submitTxFaucetClaim) {
                    const tx = await listener.getTransaction(submitTxFaucetClaim?.hash)
                    console.log("tx", tx);
                }
            }, 2000)
            return
        }
        if (errorFaucetClaim) {
            toast.warn('Error claiming, try again or contact support')
            return
        }
    }, [errorFaucetClaim, isErrorTxFaucetClaim, submitTxFaucetClaim])

    //SUCCESS CASE
    useEffect(() => {
        if (isSuccessTxFaucetClaim) {
            toast.success(`Claim success! + ${tokenReward}  YenTokens`)
            fetchFaucetBalance()
            updateUserBalance()
            checkCooldown()
            return
        }

        if (successFaucetClaim) {
            toast.success(`Claim transaction sent!`)
            return
        }
    }, [successFaucetClaim, isSuccessTxFaucetClaim])

    useEffect(() => {
        if (secondsLeft > 0) {
            const timer = setTimeout(() => {
                const now = Math.floor(Date.now() / 1000);
                const calculation = (claimCooldown + faucetCd) - now;
                setSecondsLeft(calculation);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            if (readyToClaim) return
            checkCooldown()
        }

    }, [secondsLeft]);

    return (
        <div>
            <div className="box">Faucet Balance : {faucetBalance} <YenIcon /></div>
            {userAddress ?
                <div className={`mt-4 text-center`}>
                    {secondsLeft > 0 &&
                        <CountdownTimer
                            secondsLeft={secondsLeft}
                        />
                    }

                    <button
                        disabled={(loadingTxFaucetClaim || (secondsLeft > 0 || !readyToClaim || loadingClaim))}
                        className={`${(!readyToClaim || loadingTxFaucetClaim || loadingClaim) ? 'bg-zinc-400' : 'bg-yellow-400'} text-black p-3 font-bold rounded-lg text-lg px-5`}
                        onClick={() => claim()}
                    >
                        {loadingTxFaucetClaim || loadingClaim ? "Getting reward..." : <span>Claim {tokenReward} Yen Tokens <FontAwesomeIcon icon={faRocket} /></span>}
                    </button>
                </div>
                :
                <div className="ta-c mt-5 box">
                    <h1 className="text-lg mb-3">
                        Connect your wallet to claim
                    </h1>
                    <div className="w-fit">
                        <ConnectWalletBtn />
                    </div>
                </div>
            }


        </div >
    );

}

