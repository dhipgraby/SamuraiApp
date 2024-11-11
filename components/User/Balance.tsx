"use client";
import React from "react";
import YenIcon from "../YenIcon";
import ConnectWalletBtn from "../ConnectWalletBtn";
import { ConnectKitButton } from "connectkit";
import { useUserBalances } from "@/queries/user.queries";
import { useUserAddress } from "@/queries/user.queries";

interface BalanceQuery {
  userBalance: string;
  ethBalance: string;
}

export default function Balance() {
  const { data, isLoading } = useUserBalances();
  const balanceQuery = data as BalanceQuery;
  const userBalance = balanceQuery?.userBalance;
  const userAddress = useUserAddress().toString();

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
      {!userAddress || userAddress === "" ? (
        <ConnectWalletBtn />
      ) : (
        <div className="flex flex-wrap gap-4">
          <div
            className={
              "bg-black rounded-lg p-2 px-5 border-2 border-gray-500 cursor-pointer hover:border-rose-500"
            }
            onClick={handleBalanceClick}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Balance: {userBalance} <YenIcon />
              </>
            )}
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
