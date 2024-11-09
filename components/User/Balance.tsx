"use client";
import React from "react";
import YenIcon from "../YenIcon";
import ConnectWalletBtn from "../ConnectWalletBtn";
import { ConnectKitButton } from "connectkit";
import { useUser } from "@/hooks/userQuery";
import { useAccount } from "wagmi";

export default function Balance() {
  const { address: userAddress } = useAccount();
  const {
    tokenBalance: userBalance,
    ethBalance,
    updateBalances,
  } = useUser(userAddress);
  console.log(userAddress);

  console.log("userBalance", userBalance);
  console.log("ethBalance", ethBalance);
  const handleBalanceClick = () => {
    // Select the button inside the div with id "connectBtn" and trigger a click
    const connectButton = document.querySelector(
      "#connectBtn button"
    ) as HTMLButtonElement | null;
    if (connectButton) {
      connectButton.click();
    }
  };

  return (
    <>
      {!userAddress || userAddress.toString() === "" ? (
        <ConnectWalletBtn />
      ) : (
        <div className="flex flex-wrap gap-4">
          <div
            className={
              "bg-black rounded-lg p-2 px-5 border-2 border-gray-500 cursor-pointer hover:border-rose-500"
            }
            onClick={handleBalanceClick}
          >
            Balance: {userBalance} <YenIcon />
          </div>
          {/* Render the ConnectKitButton inside a div with id "connectBtn" */}
          <div id="connectBtn">
            <ConnectKitButton />
          </div>
        </div>
      )}
    </>
  );
}
