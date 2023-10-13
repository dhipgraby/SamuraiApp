'use client'
import { FaucetProps } from "@/dto/tokenDto";
import AdminMint from "./AdminMint";
import TokenInfo from "../Faucet/TokenInfo";

export default function Faucet({
    tokenAddress,
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
