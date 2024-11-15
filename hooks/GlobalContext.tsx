"use client";
import React, { useState, useEffect } from "react";
import { useUserAddress } from "@/queries/user.queries";
import { useUserBalances } from "@/queries/user.queries";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useUser } from "@/hooks/userHook";
interface BalanceQuery {
  userBalance: string;
  ethBalance: string;
}

export const GlobalContext = React.createContext({});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { refetchUserBalance } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  useAccount({
    onConnect: () => {
      refetchUserBalance();
    },
    onDisconnect: () => {
      queryClient.setQueryData(["user-address"], null);
      queryClient.setQueryData(["user-balances"], null);
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      queryClient.invalidateQueries({ queryKey: ["user-balances"] });
    },
  });

  const { data: address } = useUserAddress();
  const { data } = useUserBalances();
  const userBalances = data as BalanceQuery;
  const { userBalance, ethBalance } = userBalances || {
    userBalance: "0",
    ethBalance: "0",
  };

  useEffect(() => {
    if (address) {
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      queryClient.invalidateQueries({ queryKey: ["user-balances"] });
    } else {
      queryClient.setQueryData(["user-address"], null);
    }

    const fetchData = async () => {
      await sleep(1000);
      setIsLoading(false);
    };
    fetchData();
  }, [userBalance, address, ethBalance]);

  if (isLoading)
    return (
      <div className="inset-center">
        <Image
          width={400}
          height={400}
          className=" bounce-scale"
          src={"/logosquare.jpg"}
          alt="logoloading..."
        />
      </div>
    );

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;
