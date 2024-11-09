'use client';
import React from "react";
import YenIcon from "../YenIcon";
import { userStore } from "@/store/user";
import ConnectWalletBtn from "../ConnectWalletBtn";
import { ConnectKitButton } from "connectkit";

export default function Balance() {

    const userAddress = userStore((state) => state.address);
    const userBalance = userStore((state) => state.tokenBalance);

    const handleBalanceClick = () => {
        // Select the button inside the div with id "connectBtn" and trigger a click
        const connectButton = document.querySelector('#connectBtn button') as HTMLButtonElement | null;
        if (connectButton) {
            connectButton.click();
        }
    };

    return (
        <>
            {
                (!userAddress || userAddress === '')
                    ?
                    <ConnectWalletBtn />
                    :
                    <div className="flex flex-wrap gap-4">
                        <div
                            className={'bg-black rounded-lg p-2 px-5 border-2 border-gray-500 cursor-pointer hover:border-rose-500'}
                            onClick={handleBalanceClick}
                        >
                            Balance: {userBalance} <YenIcon />
                        </div>
                        {/* Render the ConnectKitButton inside a div with id "connectBtn" */}
                        <div id="connectBtn">
                            <ConnectKitButton />
                        </div>
                    </div>
            }
        </>
    );
}
