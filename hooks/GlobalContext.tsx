'use client'
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUserData } from './userHook';
import { userStore } from '@/store/user';
import { parseAmount } from '@/helpers/converter';

export const GlobalContext = React.createContext({});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const GlobalProvider = ({ children }: {
  children: React.ReactNode
}) => {

  const [isLoading, setIsLoading] = useState(true);

  const { address } = useAccount()
  const { userData: { data } } = useUserData()
  const updateUserAddress = userStore((state) => state.updateAddress)
  const updateUserBalance = userStore((state) => state.updateBalance)

  useEffect(() => {

    if (address) updateUserAddress(address)
    const userBalance = data && data[0].result != undefined ? parseAmount(data[0].result.toString()) : '0';
    if (userBalance) updateUserBalance(userBalance)

    const fetchData = async () => {
      await sleep(1000);
      setIsLoading(false)
    };
    fetchData();

  }, [data, address])

  if (isLoading) return <div>Loading...</div>;

  return (
    <GlobalContext.Provider value={{}} >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
