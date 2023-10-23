import { usePrepareContractWrite, useContractWrite, useContractReads } from "wagmi";
import { samuraiContract, tokenContract } from "@/contracts/contractData";
import { ethers } from "ethers";
import { handlePrepareMintError } from "@/helpers/txHelper";
import { userStore } from "@/store/user";
import { web3Address } from "@/dto/tokenDto";

export function useMintConfig({ tokenId, setErrorMsg, amount = '0' }: { tokenId: number, setErrorMsg: (msg: string) => void, amount: string }) {

    const userAddress = userStore((state) => state.address)

    // ---------------------   WRITE FUNCTIONS ------------------------

    const { config: mintConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMint',
        args: [tokenId],
        value: ethers.parseEther("0.19"),
        onError(error) {
            handlePrepareMintError(error, setErrorMsg)
        },
    })

    const { config: tokenMintConfig } = usePrepareContractWrite({
        ...samuraiContract,
        functionName: 'userMintWithToken',
        args: [tokenId],
        enabled: true,
        onError(error) {
            handlePrepareMintError(error, setErrorMsg)
        },
        account:userAddress
    })

    const { config: allowanceConfig } = usePrepareContractWrite({
        ...tokenContract,
        functionName: 'increaseAllowance',
        enabled: (amount !== '0' && amount !== ''),
        args: [samuraiContract.address, (amount !== '0' && amount !== '') ? ethers.parseEther(amount) : amount],
    })

    return {
        mintConfig,
        tokenMintConfig,
        allowanceConfig
    };
}