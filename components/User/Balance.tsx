'use client'
import { useEffect, useState } from "react"
import { ethers } from "ethers";
import { useContractReads, useAccount } from "wagmi";
import { UserBalance } from "@/dto/userDto";
import { readContractDto } from "@/dto/tokenDto";
import YenIcon from "../YenIcon";

export default function Balance({
    tokenAddress,
    tokenAbi,
}: UserBalance) {

    const { isDisconnected, address: userAddress } = useAccount()

    const [userBalance, setUserBalance] = useState('0')
    const [loadingBalance, setLoadingBalance] = useState(true)

    const tokenContract: readContractDto = {
        address: tokenAddress,
        abi: tokenAbi
    }

    const { data: readData } = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: userAddress ? [userAddress] : [],
            },
        ],
    });

    useEffect(() => {
        const balanceOf = readData && readData[0].result != undefined ? parseInt(ethers.formatEther(readData[0].result.toString())).toLocaleString() : '';
        setUserBalance(balanceOf)
        setLoadingBalance(false)
    }, [readData])

    return (
        <div className={'box'}>
            {
                isDisconnected ?
                    <p>Connect your wallet...</p>
                    :
                    loadingBalance ? 'Loading balance...' :
                        <>
                            Balance: {userBalance} <YenIcon />
                        </>
            }
        </div>
    )
}