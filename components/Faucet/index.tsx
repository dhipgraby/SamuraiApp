'use client'
import ClaimBtn from "./ClaimBtn";
import Image from "next/image";
import { useUserBalances } from "@/queries/user.queries";
import { useEffect } from "react";

export default function Page() {

    const { data: balanceQuery, refetch, isLoading } = useUserBalances()
    useEffect(() => {
        refetch()
        console.log('balanceQuery', balanceQuery);
    }, [balanceQuery, isLoading])
    return (
        <>
            <div className="mt-5 ta-c">
                
                <Image width={150} height={150} src='/icons/rewardblackbox.png' alt="yengold" />

                <h1 className="text-xl">
                    Come claim every 24 hours free Yen Token.
                    <br />
                    You can buy <span className="text-yellow-400">Bloodlines</span> NFT with Yen Token.
                    <br />
                    Aditionally you can stake in the <span className="text-yellow-400">Yen Pools</span> to increasse your earnings
                    <br />
                    Access to token Holders community rewards.
                </h1>
            </div>
            <ClaimBtn />
        </>
    );

}
