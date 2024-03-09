'use client'
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useUser } from './userHook';
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
  const { userBalance } = useUser()
  const updateUserAddress = userStore((state) => state.updateAddress)
  const updateUserBalance = userStore((state) => state.updateBalance)

  useEffect(() => {

    if (address) {
      updateUserAddress(address)
      const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
      if (balance) updateUserBalance(balance)
    } else {
      updateUserAddress('')
    }

    const fetchData = async () => {
      await sleep(1000);
      setIsLoading(false)
    };
    fetchData();

  }, [userBalance, address])

  if (isLoading) return <div>Loading...</div>;

  return (
    <GlobalContext.Provider value={{}} >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
