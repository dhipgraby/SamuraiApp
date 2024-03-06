
import { usePrepareContractWrite } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { ethers } from "ethers";
import { handlePrepareMintError } from "@/helpers/txHelper";
import { useNFTConfigProps } from "@/dto/tokenDto";

export function useMintConfig({ tokenId, amount, nftTokenPrice, totalAllowance, isMinted }: useNFTConfigProps) {

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { config: mintConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMint',
        args: [BigInt(tokenId)],
        value: ethers.parseEther("0.19"),
        enabled: !isMinted,
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
        enabled: Boolean(amount.toString() !== '0' && amount.toString() !== '' && amount.toString() >= nftTokenPrice),
        args: [samuraiContract.address, amount],
    })

    const { config: setTokenConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'setERC20TokenAddress',
        args: [tokenContract.address],
    })

    return {
        mintConfig,
        tokenMintConfig,
        allowanceConfig
    };
}