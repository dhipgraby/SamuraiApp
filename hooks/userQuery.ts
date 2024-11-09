// userQuery.ts
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useBalance, useContractRead } from 'wagmi';
import { tokenContract } from '@/contracts/contractData';
import { parseAmount } from '@/helpers/converter';
import { web3Address } from '@/dto/tokenDto';

// Define query keys
export const userKeys = createQueryKeys('user', {
  address: null,
  balance: (address: string) => [address],
  ethBalance: (address: string) => [address],
});

// Custom hook for user data
export function useUser(address: string | undefined) {
  const queryClient = useQueryClient();

  // Query for ETH balance
  const { data: ethBalance } = useQuery({
    queryKey: userKeys.ethBalance(address || '').queryKey,
    queryFn: async () => {
      if (!address) return null;
      const balance = await useBalance({
        address: address as any,
      });
      return balance ? parseAmount(balance.toString()) : '0';
    },
    enabled: Boolean(address),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });

  // Query for token balance
  const { data: tokenBalance, refetch: refetchTokenBalance } = useQuery({
    queryKey: userKeys.balance(address || '').queryKey,
    queryFn: async () => {
      if (!address) return null;
      const result = await useContractRead({
        ...tokenContract,
        functionName: 'balanceOf',
        args: [address as web3Address],
      });
      return result ? parseAmount(result.toString()) : '0';
    },
    enabled: Boolean(address),
  });

  // Function to update user balances
  const updateBalances = async () => {
    console.log(userKeys.balance(address || ''));
    
    await Promise.all([
      queryClient.invalidateQueries(userKeys.balance(address || '')),
      queryClient.invalidateQueries(userKeys.ethBalance(address || '')),
    ]);
  };

  return {
    ethBalance: ethBalance || '0',
    tokenBalance: tokenBalance || '0',
    refetchTokenBalance,
    updateBalances,
  };
}