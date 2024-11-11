"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "./userHook";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

export const GlobalContext = React.createContext({});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const { address, userBalance, ethBalance } = useUser();

  useEffect(() => {
    if (address) {
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
      queryClient.invalidateQueries({ queryKey: ["user-balances"] });
    } else {
      const address = "";
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
