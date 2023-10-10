import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { FaucetProps } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import { useFaucetContract } from "@/hooks/useFaucetContract";
import { ethers } from "ethers";

export default function ClaimBtn({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    const [claimCooldown, setclaimCooldown] = useState('');
    const [tokenReward, setTokenReward] = useState('');
    const [loadingTimer, setLoadingTimer] = useState(true);

    const {
        faucetClaim: { isLoading, isError, isSuccess, write },
        userData: { data: claimData, isLoading: isLoadingUser }
    } = useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi });

    async function claim() {
        try {
            write?.()
        } catch (error) {
            toast.warn('Claim error, try again or contact support')
        }

    }

    useEffect(() => {
        console.log("claimData", claimData);
        const reward = claimData && claimData[1].result != undefined ? parseInt(ethers.formatEther(claimData[1].result.toString())).toLocaleString() : '0';

        setTokenReward(reward)

        setLoadingTimer(false)
        if (isSuccess) toast.success('Claim success! + 1000 YenTokens')
        if (isError) toast.warn('Error claiming, try again or contact support')
    }, [isSuccess, isError])

    return (
        <div>
            <div className={`mt-4 text-center`}>
                <button
                    disabled={isLoading}
                    className={`bg-white text-black p-3 rounded-lg text-lg`}
                    onClick={() => claim()}
                >
                    {isLoading ? "Getting reward..." : <span>Claim {tokenReward} Yen Tokens <FontAwesomeIcon icon={faRocket} /></span>}
                </button>
            </div>
        </div >
    );

}

