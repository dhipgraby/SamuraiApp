'use client'
import React, { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
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
  const { userBalance, ethBalance } = useUser()

  const updateUserAddress = userStore((state) => state.updateAddress)
  const updateUserBalance = userStore((state) => state.updateBalance)
  const updateEthBalance = userStore((state) => state.updateEthBalance)

  useEffect(() => {

    console.log('result:', ethBalance?.formatted);

    if (address) {
      updateUserAddress(address)
      const balance = userBalance ? parseAmount(userBalance.toString()) : '0';
      const ethereumBalance = ethBalance ? ethBalance.formatted : '0';
      updateUserBalance(balance)
      updateEthBalance(ethereumBalance)
    } else {
      updateUserAddress('')
    }

    const fetchData = async () => {
      await sleep(1000);
      setIsLoading(false)
    };
    fetchData();

  }, [userBalance, address, ethBalance])

  if (isLoading) return <div>Loading...</div>;

  return (
    <GlobalContext.Provider value={{}} >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
