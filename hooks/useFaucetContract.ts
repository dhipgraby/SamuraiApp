import { useContractWrite, useContractReads } from "wagmi";
import { web3Address } from "@/dto/tokenDto";
import { useFaucetConfig } from "./config/faucetConfig";
import { userStore } from "@/store/user";
import { faucetContract, tokenContract } from "@/contracts/contractData";

interface FaucetProps {
    amountTo?: string;
}

export function useFaucetContract({ amountTo = '0' }: FaucetProps) {

    const address = userStore((state) => state.address)

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { depositTokens, requestTokens, tokenConfig } = useFaucetConfig({ amountTo })

    const depositToFaucet = useContractWrite(depositTokens.config);
    const faucetClaim = useContractWrite(requestTokens.config);
    const tokenWrite = useContractWrite(tokenConfig.config);

    // ---------------------   READ FUNCTIONS ------------------------

    const readData = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'allowance',
                args: [address as web3Address, faucetContract.address as web3Address]
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
