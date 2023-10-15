'use client';
import React, { useEffect, useState } from 'react';

const UserAccountCard: React.FC = () => {

  return (
    <div className="text-center text-purple-500">
      {/* {userStakeData ? (
        <div>
          <p>Escrow Balance: {escrowBalance ?? 'Loading...'}</p>
          <p>User Stake Ids: {userStakeIds ?? 'Loading...'}</p>
          <p>User Stake Rewards: {userStakeRewards ?? 'Loading...'}</p>
          <p>User Stake Balance: {userStakeBalance ?? 'Loading...'}</p>
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
      )} */}
    </div>
  );
};

export default UserAccountCard;
