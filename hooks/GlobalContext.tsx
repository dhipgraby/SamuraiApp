// GlobalContext.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useUser } from "./userQuery";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const GlobalContext = React.createContext({});

const GlobalProviderContent = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();
  const { tokenBalance, ethBalance } = useUser(address);

  useEffect(() => {
    const fetchData = async () => {
      await sleep(1000);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="inset-center">
        <Image
          width={400}
          height={400}
          className="bounce-scale"
          src="/logosquare.jpg"
          alt="logoloading..."
        />
      </div>
    );

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProviderContent>{children}</GlobalProviderContent>
    </QueryClientProvider>
  );
};

export default GlobalContext;
