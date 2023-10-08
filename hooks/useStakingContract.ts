import { useState } from "react";
import { useContractWrite, useContractReads, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useStakingConfig } from "./config/stakingConfig";

interface StakingProps {
    escrowAddress?: web3Address | undefined;
    stakingPoolAddress: web3Address | undefined;
    tokenStakingPlatformAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    escrowAbi?: any;
    oneDayStakingContractAbi: any;
    tokenStakingPlatformAbi: any;
    tokenAbi: any;
    amountTo?: string;
    setNeedAllowance: (allow: boolean) => void;
}

export function useStakingContract({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, escrowAbi, tokenStakingPlatformAbi, oneDayStakingContractAbi, tokenAbi, amountTo = '0'}: StakingProps) {

    const [needAllowance, setNeedAllowance] = useState(false);
    const { address } = useAccount();

    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: tokenAbi
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

    const { claimTokens, stakeTokens, tokenConfig } = useStakingConfig({ escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress, oneDayStakingContractAbi, tokenStakingPlatformAbi, tokenAbi, amountTo, setNeedAllowance})

    const platformClaim = useContractWrite(claimTokens.config);
    const poolStakeWrite = useContractWrite(stakeTokens.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    // ---------------------   READ FUNCTIONS ------------------------

    const readData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, escrowAddress as web3Address]
            },
            {
                ...tokenStakingPlatformContract,
                functionName: 'getStakeData',
                args: [Number] // stakeId
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
                args: [address as web3Address, Number] // stakeId
            },
            {
                ...escrowContract,
                functionName: 'userStakeBalances',
                args: [address as web3Address, Number] // stakeId
            },
        ]
    });

    return {
        needAllowance,
        platformClaim,
        poolStakeWrite,
        tokenWrite,
        readData,
        userData,
    };
}
