'use client'
// app/components/StakingInfoCard.tsx
import { useStakingContract } from "@/hooks/useStakingContract";
import escrowAbi from "@/contracts/abi/escrowAbi.json";
import oneDayStakingContractAbi from "@/contracts/abi/oneDayStakingContractAbi.json";
import tokenStakingPlatformAbi from "@/contracts/abi/tokenStakingPlatformAbi.json";
import yenAbi from "@/contracts/abi/yenAbi.json";
import { Address } from "@/dto/tokenDto";
import { useState, useEffect } from "react";

interface StakeProps {
  escrowAddress: Address | undefined;
  stakingPoolAddress: Address | undefined;
  tokenStakingPlatformAddress: Address | undefined;
  tokenAddress: Address | undefined;
}

export default function StakingInfoCard({escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress}: StakeProps) {
  const [readData, setData] = useState({});
  const [userData, setUser] = useState({});

  useEffect(() => {
  const getData = async () => {
    const { readData, userData } = useStakingContract({
      escrowAddress: escrowAddress,
      stakingPoolAddress: stakingPoolAddress,
      tokenStakingPlatformAddress: tokenStakingPlatformAddress,
      tokenAddress: tokenAddress,
      escrowAbi,
      oneDayStakingContractAbi,
      tokenStakingPlatformAbi,
      yenAbi
    });
    setData(readData);
    setUser(userData);
    return readData;
  }
    console.log("readData", readData);
    getData();
  }, []);

    
 

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Staking Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold">Read Data</h3>
          <pre>{JSON.stringify(readData, null, 2)}</pre>
        </div>
        <div>
          <h3 className="text-xl font-semibold">User Data</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}