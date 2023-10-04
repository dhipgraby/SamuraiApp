'use client'
import styles from "@/app/faucet/index.module.css"
import { useAccount } from "wagmi";
import TokenInfo from "./TokenInfo";
import { FaucetProps } from "@/dto/tokenDto";
import Balance from "../User/Balance";
import ClaimBtn from "./ClaimBtn";

export default function AdminUI({
    faucetAddress,
    tokenAddress,
    faucetAbi,
    tokenAbi,
}: FaucetProps) {

    return (
        <>
            <div className="mt-5 text-center">
                <h1 className="text-xl">
                    Come claim every 24 hours free Yen Token.
                    <br />
                    You can buy <span className="text-yellow-400">Bloodlines</span> NFT with Yen Token.
                    <br />
                    Aditionally you can stake <span className="text-yellow-400">Yen Pools</span>
                    <br />
                    support the community and increasse your earnings
                </h1>
            </div>
            <Balance
                tokenAddress={tokenAddress}
                tokenAbi={tokenAbi}
            />

            <TokenInfo address={tokenAddress} abi={tokenAbi} />
            <ClaimBtn
                faucetAddress={faucetAddress}
                tokenAddress={tokenAddress}
                faucetAbi={faucetAbi}
                tokenAbi={tokenAbi}
            />
        </>
    );

}
