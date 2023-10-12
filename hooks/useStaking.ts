'use client'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useStakingContract } from "@/hooks/useStakingContract";
import { useAccount } from "wagmi";
import escrowAbi from "@/contracts/abi/escrowAbi.json";
import oneDayStakingContractAbi from "@/contracts/abi/oneDayStakingContractAbi.json";
import tokenStakingPlatformAbi from "@/contracts/abi/tokenStakingPlatformAbi.json";
import yenAbi from "@/contracts/abi/yenAbi.json";
import { Address } from "@/dto/tokenDto";

export interface StakeProps {
  escrowAddress: Address | undefined;
  stakingPoolAddress: Address | undefined;
  tokenStakingPlatformAddress: Address | undefined;
  tokenAddress: Address | undefined;
}

export const useStakingData = ({
  escrowAddress,
  stakingPoolAddress,
  tokenStakingPlatformAddress,
  tokenAddress,
}: StakeProps) => {
  const [escrowBalance, setEscrowBalance] = useState("");
  const [userStakeIds, setUserStakeIds] = useState([""]);
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

  console.log("userStakeIds", userStakeIds);
  console.log("userStakeRewards", userStakeRewards);
  console.log("userStakeBalance", userStakeBalance);
  console.log("userStakeAllowance", userStakeAllowance);
  console.log("userStakeData", userStakeData);
  return {
    escrowBalance,
    userStakeIds,
    userStakeRewards,
    userStakeBalance,
    userStakeAllowance,
    userStakeData
  };
};
