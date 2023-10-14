"use client";
import { useStakingContract } from "@/hooks/useStakingContract";
import escrowAbi from "@/contracts/abi/escrowAbi.json";
import oneDayStakingContractAbi from "@/contracts/abi/oneDayStakingContractAbi.json";
import tokenStakingPlatformAbi from "@/contracts/abi/tokenStakingPlatformAbi.json";
import yenAbi from "@/contracts/abi/yenAbi.json";
import { Address } from "@/dto/tokenDto";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

interface StakeProps {
  escrowAddress: Address | undefined;
  stakingPoolAddress: Address | undefined;
  tokenStakingPlatformAddress: Address | undefined;
  tokenAddress: Address | undefined;
}

export default function StakingInfoCard({
  escrowAddress,
  stakingPoolAddress,
  tokenStakingPlatformAddress,
  tokenAddress,
}: StakeProps) {
  const [escrowBalance, setEscrowBalance] = useState("");
  const [userStakeIds, setUserStakeIds] = useState("");
  const [userStakeRewards, setUserStakeRewards] = useState([]);
  const [userStakeBalance, setUserStakeBalance] = useState([]);
  const [userStakeAllowance, setUserStakeAllowance] = useState();
  const [userStakeData, setUserStakeData] = useState([]);
  const { address } = useAccount();

  const {
    readData: { data: readData },
    userData: { data: userData },
  } = useStakingContract({
    escrowAddress: escrowAddress,
    stakingPoolAddress: stakingPoolAddress,
    tokenStakingPlatformAddress: tokenStakingPlatformAddress,
    tokenAddress: tokenAddress,
    escrowAbi,
    oneDayStakingContractAbi,
    tokenStakingPlatformAbi,
    yenAbi,
    amountTo: "1000",
    stakeId: userStakeIds && userStakeIds[0], // hardcoded for now
  });

  useEffect(() => {

    const _balance: any =
      readData && readData[2].result != undefined
        ? parseInt(ethers.formatEther(readData[2].result.toString())).toLocaleString()
        : null;

    const _userStakeAllowance: any =
      readData && readData[0].result != undefined
        ? parseInt(ethers.formatEther(readData[0].result.toString())).toLocaleString()
        : null;

    const _userStakeData: any =
      readData && readData[1].result != undefined
        ? readData[1].result
        : null;

    console.log("readData", readData);
    setEscrowBalance(_balance);
    setUserStakeAllowance(_userStakeAllowance);
    setUserStakeData(_userStakeData);
  }, [readData]);



  useEffect(() => {

    const _userStakeRewards: any =
      userData && userData[0].result != undefined
        ? parseInt(ethers.formatEther(userData[0].result.toString())).toLocaleString() : null;

    const _userStakeBalance: any =
      userData && userData[1].result != undefined
        ? parseInt(ethers.formatEther(userData[1].result.toString())).toLocaleString() : null;

    const _userStakeIds: any =
      userData && userData[2].result != undefined
        ? userData[2].result.toString() : null;


    setUserStakeIds(_userStakeIds);
    setUserStakeBalance(_userStakeBalance);
    setUserStakeRewards(_userStakeRewards);
  }, [userData])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full text-black">
      <h2 className="text-xl font-bold mb-4">Staking Data</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className=" space-y-2 px-2 py-2 border border-sky-100 rounded-xl shadow-md">
          <h3 className="text-xs font-semibold text-gray-500 text-left">Yen reward in escrow</h3>
          <p className="text-xs">YEN: {escrowBalance}</p>
        </div>

        <div className="col-span-2 space-y-2 px-2 py-2 border border-sky-100 rounded-xl shadow-md">
          <h3 className="text-xs font-semibold text-gray-500 text-left">User account: </h3>
          <p className="text-xs">{address}</p>
          <h3 className="text-xs font-semibold text-gray-500 text-left">User staked balance: </h3>
          <p className="text-xs">{userStakeBalance}</p>
          <h3 className="text-xs font-semibold text-gray-500 text-left">User accumulating reward: </h3>
          <p className="text-xs">{userStakeRewards}</p>
          <h3 className="text-xs font-semibold text-gray-500 text-left">User StakeIds </h3>
          <p className="text-xs">[ id: {userStakeIds} ]</p>
          <h3 className="text-xs font-semibold text-gray-500 text-left">User Stake Allowance </h3>
          <p className="text-xs">{userStakeAllowance}</p>
        </div>
        <div className="text-black col-span-2 space-y-2 px-2 py-2 border border-sky-100 rounded-xl shadow-md">
          <h3 className="text-xs font-semibold text-gray-500 text-left">User Stake Data </h3>
          {userStakeData ? (
            <div>
              {Object.keys(userStakeData).map((key: any, index: number) => (
                <p  className="text-xs" key={index}>
                  {key}: {typeof userStakeData[key] === 'bigint' ? userStakeData[key].toString() : userStakeData[key]}
                </p>
              ))}
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>

  );
}
