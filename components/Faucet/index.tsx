'use client'
import TokenInfo from "./TokenInfo";
import Balance from "../User/Balance";
import ClaimBtn from "./ClaimBtn";

export default function Page() {

    return (
        <>
            <div className="mt-5 ta-c">

                <img width={150} src='/icons/rewardblackbox.png' alt="yengold" />

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
            <Balance />

            <TokenInfo />
            <ClaimBtn />
        </>
    );

}
