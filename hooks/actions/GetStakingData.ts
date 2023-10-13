// @/hooks/actions/useGetStakingData.ts
'use client'
import { useState, useEffect } from "react";
import { formatEther } from "@/helpers/stakingUtils";
import { useStakingContract } from "@/hooks/useStakingContract";
import { useAccount } from "wagmi";
import escrowAbi from "@/contracts/abi/escrowAbi.json";
import tokenStakingPlatformAbi from "@/contracts/abi/tokenStakingPlatformAbi.json";
import yenAbi from "@/contracts/abi/yenAbi.json";
import { StakePoolAddressesProps } from "@/dto/stakingDto";
import { GetContractAddresses } from "./GetContractAddresses";

export const useGetStakingData = ({

}: StakePoolAddressesProps) => {
  const [escrowBalance, setEscrowBalance] = useState();
  const [userStakeIds, setUserStakeIds] = useState();
  const [userStakeRewards, setUserStakeRewards] = useState([]);
  const [userStakeBalance, setUserStakeBalance] = useState([]);
  const [userStakeAllowance, setUserStakeAllowance] = useState();
  const [userStakeData, setUserStakeData] = useState([]);
  const [readData, setReadData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const { address } = useAccount();

  const [contractAddresses, setContractAddresses] = useState<any>(null);

  useEffect(() => {
    const fetchContractAddresses = async () => {
      try {
        const addresses = await GetContractAddresses();
        setContractAddresses(addresses);
      } catch (error) {
        console.error('Failed to fetch contract addresses:', error);
      }
    };

    fetchContractAddresses();
  }, []);


  
     
        const {
          readData: { data: readsData },
          userData: { data: usersData },
        } =  useStakingContract({
          escrowAddress: contractAddresses.escrowAddress,
          stakingPoolAddress: contractAddresses.stakingPoolAddress,
          tokenStakingPlatformAddress: contractAddresses.tokenStakingPlatformAddress,
          tokenAddress: contractAddresses.tokenAddress,
          escrowAbi,
          tokenStakingPlatformAbi,
          yenAbi,
          amountTo: "0",
          stakeId: undefined,
          poolType: undefined,
        });
      
        useEffect(() => {
        setReadData(readsData);
        setUserData(usersData);
        console.log("readData", readData);
        }, []);
  



  useEffect(() => {
    const _balance: any =
      readData && readData[2].result != undefined
        ? parseInt(formatEther(readData[0].result?.toString())).toLocaleString()
        : null;

    const _userStakeAllowance: any =
      readData && readData[0].result != undefined
        ? parseInt(formatEther(readData[0].result.toString())).toLocaleString()
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
        ? parseInt(formatEther(userData[0].result)).toLocaleString() : null;

    const _userStakeBalance: any =
      userData && userData[1].result != undefined
        ? parseInt(formatEther(userData[1].result.toString())).toLocaleString() : null;

    const _userStakeIds: any =
      userData && userData[2].result != undefined
        ? userData[2].result.toString() : null;


    setUserStakeIds(_userStakeIds);
    setUserStakeBalance(_userStakeBalance);
    setUserStakeRewards(_userStakeRewards);
  }, [userData])


  return {
    escrowBalance,
    userStakeIds,
    userStakeRewards,
    userStakeBalance,
    userStakeAllowance,
    userStakeData: userData,
  };
};
