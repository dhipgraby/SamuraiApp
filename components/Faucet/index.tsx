'use client'
import { useState, useEffect } from "react"
import styles from "@/app/faucet/index.module.css"
import { useAccount, useContractWrite, usePrepareContractWrite, useContractReads } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import TokenInfo from "./TokenInfo";
import ClaimBtn from "./ClaimBtn";
import { YenToken, readContractDto } from "@/dto/tokenDto";

interface FaucetProps {
    faucetAddress: `0x${string}` | undefined;
    tokenAddress: `0x${string}` | undefined;
    faucetAbi: any[];
    tokenAbi: any[];
}

export default function Faucet({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    const yenIcon = <span className="text-yellow-400"><FontAwesomeIcon icon={faYenSign} /></span>

    const { isDisconnected, address } = useAccount();

    const tokenContract: readContractDto = {
        address: tokenAddress,
        abi: tokenAbi
    }

    // const { config } = usePrepareContractWrite({
    //     address: contractAddress,
    //     abi: YenTokenAbi,
    //     functionName: 'userMint',
    //     args: [tokenId],
    //     value: ethers.parseEther("0.19"),
    // })

    // const { data, isLoading, isSuccess, write } = useContractWrite(config)  

    // async function mint() {
    //     write?.()
    // }

    return (
        <>
            <TokenInfo address={tokenAddress} abi={tokenAbi} />
            <ClaimBtn />
        </>
    );

}
