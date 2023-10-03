import styles from "@/app/faucet/index.module.css"
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useContractReads } from "wagmi";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { FaucetProps } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import AdminMint from "../Admin/AdminMint"
import YenIcon from "../YenIcon";

export default function ClaimBtn({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    const [addressTo, setAddressTo] = useState('')
    const [amountTo, setAmountTo] = useState('0')

    const { config } = usePrepareContractWrite({
        address: tokenAddress,
        abi: tokenAbi,
        functionName: 'mint',
        args: addressTo ? [addressTo, (amountTo) ? ethers.parseEther(amountTo) : '0'] : [],
    })

    const { data, isLoading, isError, isSuccess, write } = useContractWrite(config)

    async function mint() {
        if (Number(amountTo) < 1) {
            toast.warn('Amount should be greater than 1')
            return
        }
        write?.()
    }

    useEffect(() => {
        if (isSuccess) toast.success('Token successfully minted!')
        if (isError) toast.warn('Error minting, try again or contact support')
    }, [isSuccess, isError])

    return (
        <div>
            <div className={`mt-4 text-center`}>
                <button
                    className={`bg-white text-black p-3 rounded-lg text-lg`}
                >
                    Claim 100 Yen Tokens <FontAwesomeIcon icon={faRocket} />
                </button>              
            </div>
        </div >
    );

}

