'use client'
import { useAccount, useContractWrite, usePrepareContractWrite, useContractReads } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { YenToken, readContractDto, FaucetProps } from "@/dto/tokenDto";
import AdminMint from "./AdminMint";
import TokenInfo from "../Faucet/TokenInfo";

export default function Faucet({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    return (
        <>
            <TokenInfo address={tokenAddress} abi={tokenAbi} />
            <AdminMint
                tokenAddress={tokenAddress}
                tokenAbi={tokenAbi}
            />
        </>
    );

}
