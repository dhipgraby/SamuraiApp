'use client'
import { useContractWrite, useContractReads, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";
import { useEffect } from "react";

interface StakingProps {
    escrowAddress?: web3Address | undefined;
    stakingPoolAddress: web3Address | undefined;
    tokenStakingPlatformAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    escrowAbi?: any;
    oneDayStakingContractAbi: any;
    tokenStakingPlatformAbi: any;
    yenAbi: any;
    amountTo?: string;
    //setNeedAllowance: (allow: boolean) => void;
}

export function useStakingContract({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, escrowAbi, tokenStakingPlatformAbi, oneDayStakingContractAbi, yenAbi, amountTo = '0' }: StakingProps) {
  /*   const { address } = useAccount();  // Ensure this is at the top level

    useEffect(() => {
        if (!address) {
            console.log("no address");
        }
    }, [address]); */
    const address = "0x0000000000000000000000000000000000000000"
    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: yenAbi
    };

    const stakingPoolContract = {
        address: stakingPoolAddress as web3Address,
        abi: oneDayStakingContractAbi
    };

    const tokenStakingPlatformContract = {
        address: tokenStakingPlatformAddress as web3Address,
        abi: tokenStakingPlatformAbi
    };

    const escrowContract = {
        address: escrowAddress as web3Address,
        abi: escrowAbi
    };

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { claimTokens, stakeTokens, tokenConfig } = useStakingConfig({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, oneDayStakingContractAbi, tokenStakingPlatformAbi, yenAbi, amountTo, setNeedAllowance: () => { } });

    const platformClaim = useContractWrite(claimTokens.config);
    const poolStakeWrite = useContractWrite(stakeTokens.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    // ---------------------   READ FUNCTIONS ------------------------

    const readData = useContractReads({
        contracts: [
            /* {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, escrowAddress as web3Address]
            }, */
            {
                // Function used to fetch the stakeData.
                ...tokenStakingPlatformContract,
                functionName: 'getStakeData',
                args: [Number] // uint256 stakeId: the stakeId to query.
            },
            {
                ...escrowContract,
                functionName: 'getRewardBalance',
            },
        ]
    });

    const userData = useContractReads({
        contracts: [
            {
                ...escrowContract,
                functionName: 'userStakeRewards',
                args: [
                    address as web3Address,
                    Number   // uint256 stakeId: the stakeId to query.
                ]
            },
            {
                ...escrowContract,
                functionName: 'userStakeBalances',
                args: [address as web3Address, Number] // stakeId
            },
            {
                //Function to fetch all stake IDs for a user.
                ...tokenStakingPlatformContract,
                functionName: 'getUserStakeIds',
                args: [address as web3Address] // address: The user's address.
            },
        ]
    });

    return {
        platformClaim,
        poolStakeWrite,
        tokenWrite,
        readData,
        userData,
    };
}
