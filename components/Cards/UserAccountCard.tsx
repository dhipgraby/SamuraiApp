// app/components/UserAccountCard.tsx
'use client';// app/components/UserAccountCard.tsx
import React, { useEffect, useState } from 'react';
import { StakePoolAddressesProps } from "@/dto/stakingDto";
import { GetContractAddresses } from "@/hooks/actions/GetContractAddresses";
import { useGetStakingData } from "@/hooks/actions/GetStakingData";

type StakingDataType = {
  escrowBalance: number;
  userStakeIds: any[];
  userStakeRewards: any[];
  userStakeBalance: any[];
  userStakeAllowance: any;
  userStakeData: any[];
} | null;

const UserAccountCard: React.FC = () => {
  const [stakingData, setStakingData] = useState<StakingDataType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractAddresses = await GetContractAddresses();
        const data = useGetStakingData(contractAddresses);
        setStakingData(data);
      } catch (error) {
        console.error('Failed to fetch staking data:', error);
      }
    };

    fetchData();
  }, []);

  const {
    escrowBalance,
    userStakeIds,
    userStakeRewards,
    userStakeBalance,
    userStakeAllowance,
    userStakeData
  } = stakingData ?? {};

  return (
    <div className="text-center text-purple-500">
      {userStakeData ? (
        <div>
          <p>Escrow Balance: {escrowBalance ?? 'Loading...'}</p>
          <p>User Stake Ids: {userStakeIds ?? 'Loading...'}</p>
          <p>User Stake Rewards: {userStakeRewards ?? 'Loading...'}</p>
          <p>User Stake Balance: {userStakeBalance ?? 'Loading...'}</p>}
          <p>User Stake Allowance: {userStakeAllowance ?? 'Loading...'}</p>
          <div>
            <h3>User Stake Data:</h3>
            <div className="border border-gray-300 rounded">
              {Object.keys(userStakeData).map((key: any, index) => (
                <p key={index} className="text-left">
                  {key}: {userStakeData[key] ?? 'Loading...'}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default UserAccountCard;
