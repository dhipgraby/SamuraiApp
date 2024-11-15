
import { usePrepareContractWrite } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { ethers } from "ethers";
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

    const { config: mintConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMint',
        args: [BigInt(tokenId)],
        value: ethers.parseEther(nftPrice),
        enabled: (!isMinted && Number(ethBalance) >= Number(nftPrice)),
    })

    const { config: tokenMintConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMintWithToken',
        args: [BigInt(tokenId)],
        onSettled(data, error) {
            if (error) {
                console.log("onSettled", { error, data, totalAllowance, nftTokenPrice })
            }
        },
        enabled: Boolean(totalAllowance && Number(nftTokenPrice) <= Number(totalAllowance) && !isMinted)
    })

    const { config: allowanceConfig } = usePrepareContractWrite({
        ...tokenContract,
        functionName: 'increaseAllowance',
        args: [samuraiContract.address, ethers.parseEther(nftTokenPrice)],
    })

    // const { config: setTokenConfig } = usePrepareContractWrite({
    //     ...samuraiContract,
    //     functionName: 'setERC20TokenAddress',
    //     args: [tokenContract.address],
    // })

    return {
        mintConfig,
        tokenMintConfig,
        allowanceConfig
    };
}