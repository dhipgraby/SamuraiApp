import { useSimulateContract, useWriteContract } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { parseEther } from "viem";
import { useNftConfigProps } from "@/dto/tokenDto";
import { useUserBalances } from "@/queries/user.queries";

interface BalanceQuery {
    ethBalance: string;
    userBalance: string;
}

export function useMintConfig({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted }: useNftConfigProps) {
    const { data } = useUserBalances();
    const userBalance = data as BalanceQuery;
    const ethBalance = userBalance?.ethBalance;
    const tokenBalance = userBalance?.userBalance;

    // ---------------------   WRITE FUNCTIONS ------------------------    

    const { data: mintData } = useSimulateContract({
        ...samuraiContract,
        functionName: 'userMint',
        args: [BigInt(tokenId)],
        value: parseEther(nftPrice),
        query: {
            enabled: (!isMinted && Number(ethBalance) >= Number(nftPrice)),
        }
    });

    const { data: tokenMintData } = useSimulateContract({
        ...samuraiContract,
        functionName: 'userMintWithToken',
        args: [BigInt(tokenId)],
        query: {
            enabled: Boolean(totalAllowance && Number(nftTokenPrice) <= Number(totalAllowance) && !isMinted)
        }
    });

    const { data: allowanceData } = useSimulateContract({
        ...tokenContract,
        functionName: 'increaseAllowance',
        args: [samuraiContract.address, parseEther(nftTokenPrice)],
    });

    return {
        mintRequest: mintData,
        tokenMintRequest: tokenMintData,
        allowanceRequest: allowanceData
    };
}