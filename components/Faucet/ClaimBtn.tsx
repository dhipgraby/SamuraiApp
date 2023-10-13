import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { FaucetProps } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import { useFaucetContract } from "@/hooks/useFaucetContract";
import { useUserData } from '@/hooks/userHook'
import { parseAmount } from "@/helpers/converter";
import { userStore } from "@/store/user";
import CountdownTimer from "./CountDownTimer";

export default function ClaimBtn({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    const [claimCooldown, setclaimCooldown] = useState(0);
    const [tokenReward, setTokenReward] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const { userData: { refetch: userBalance } } = useUserData()
    const userAddress = userStore((state: any) => state.address)
    const updateBalance = userStore((state: any) => state.updateBalance)

    const {
        faucetClaim: { isLoading, isError, isSuccess, write: claimTokens },
        userData: { data: claimData, refetch: getClaimData }
    } = useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi });

    async function claim() {
        try {
            claimTokens?.()
        } catch (error) {
            toast.warn('Claim error, try again or contact support')
        }
    }

    async function updateUserBalance() {
        const getBalance: any = await userBalance()
        const updatedBalance = getBalance && getBalance.data[0].result != undefined ? parseAmount(getBalance.data[0].result.toString()) : '0';
        updateBalance(updatedBalance)
    }

    async function checkCooldown() {
        const refetchCooldown: any = await getClaimData()
        console.log("refetchCooldown", refetchCooldown);
        const userCooldown = refetchCooldown && refetchCooldown.data[0].result != undefined ? parseInt(refetchCooldown.data[0].result.toString().replace('n', '')) : 0;
        const now = Math.floor(Date.now() / 1000);
        const calculation = (userCooldown + 86400) - now;
        setSecondsLeft(calculation)
        setclaimCooldown(userCooldown)
    }

    useEffect(() => {
        const reward = claimData && claimData[1].result != undefined ? parseAmount(claimData[1].result.toString()) : '0';
        setTokenReward(reward)
    }, [])

    useEffect(() => {
        checkCooldown()
    }, [userAddress, isSuccess])

    useEffect(() => {
        if (isError) toast.warn('Error claiming, try again or contact support')
    }, [isError])

    useEffect(() => {
        if (isSuccess) {
            toast.success(`Claim success! + ${tokenReward}  YenTokens`)
            updateUserBalance()
        }
    }, [isSuccess])

    return (
        <div>
            <div className={`mt-4 text-center`}>
                {secondsLeft > 0 &&
                    <CountdownTimer epochTimestamp={claimCooldown} />}

                <button
                    disabled={(isLoading || (secondsLeft > 0))}
                    className={`${(secondsLeft < 0) ? 'bg-yellow-400' : 'bg-zinc-400'} text-black p-3 font-bold rounded-lg text-lg px-5`}
                    onClick={() => claim()}
                >
                    {isLoading ? "Getting reward..." : <span>Claim {tokenReward} Yen Tokens <FontAwesomeIcon icon={faRocket} /></span>}
                </button>
            </div>
        </div >
    );

}

