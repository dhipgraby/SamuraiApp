import { useState } from "react";
import { useContractWrite, useContractReads, useAccount } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useFaucetConfig } from "./config/faucetConfig";

interface FaucetProps {
    faucetAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    faucetAbi: any;
    tokenAbi: any;
    amountTo?: string;
}

export function useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo = '0' }: FaucetProps) {

    const [needAllowance, setNeedAllowance] = useState(false);
    const { address } = useAccount();

    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: tokenAbi
    };

    const faucetContract = {
        address: faucetAddress as web3Address,
        abi: faucetAbi
    };

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { depositTokens, requestTokens, tokenConfig } = useFaucetConfig({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo, setNeedAllowance })

    const faucetWrite = useContractWrite(depositTokens.config);
    const faucetClaim = useContractWrite(requestTokens.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    // ---------------------   READ FUNCTIONS ------------------------

    const readData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, faucetAddress as web3Address]
            },
            {
                ...faucetContract,
                functionName: 'remainingTokens',
            },
        ]
    });

    const userData = useContractReads({
        contracts: [
            {
                ...faucetContract,
                functionName: 'lastAccessTime',
                args: [address as web3Address]
            },
            {
                ...faucetContract,
                functionName: 'maxAmount',
            },
        ]
    });

    return {
        needAllowance,
        faucetWrite,
        faucetClaim,
        tokenWrite,
        readData,
        userData,
    };
}
