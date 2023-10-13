import { useContractWrite, useContractReads } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useFaucetConfig } from "./config/faucetConfig";
import { userStore } from "@/store/user";

interface FaucetProps {
    faucetAddress: web3Address | undefined;
    tokenAddress: web3Address | undefined;
    faucetAbi: any;
    tokenAbi: any;
    amountTo?: string;
}

export function useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo = '0' }: FaucetProps) {

    const address = userStore((state) => state.address)

    const tokenContract = {
        address: tokenAddress as web3Address,
        abi: tokenAbi
    };

    const faucetContract = {
        address: faucetAddress as web3Address,
        abi: faucetAbi
    };

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { depositTokens, requestTokens, tokenConfig } = useFaucetConfig({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo })

    const depositToFaucet = useContractWrite(depositTokens.config);
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
        depositToFaucet,
        faucetClaim,
        tokenWrite,
        readData,
        userData,
    };
}
