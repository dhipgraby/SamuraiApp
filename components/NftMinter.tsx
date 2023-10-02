import { useEffect, useState } from "react"
import styles from "./css/NftMinter.module.css";
import BuyEth from "./BuyBtns/BuyEth";
import BuyYen from "./BuyBtns/BuyYen";
import { useAccount, useContractWrite, usePrepareContractWrite, useContractReads } from "wagmi";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";

interface minterProps {
  contractAddress: `0x${string}` | undefined;
  abi: any[],
  tokenId: number
}

export default function NftMinter({
  contractAddress,
  abi,
  tokenId
}: minterProps) {

  const [nftPrice, setNftPrice] = useState<string | null>(null)
  const [nftTokenPrice, setNftTokenPrice] = useState<string | null>(null)

  const { isDisconnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'userMint',
    args: [tokenId],
    value: ethers.parseEther("0.19"),
  })

  const nftContract = {
    address: contractAddress,
    abi: abi,
  }

  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const { data: readData, isError, isLoading: isReadLoading } = useContractReads({
    contracts: [
      {
        ...nftContract,
        functionName: 'initialPrice',
      },
      {
        ...nftContract,
        functionName: 'initialTokenPrice',
      },
    ],
  });

  async function mint() {
    write?.()
  }

  useEffect(() => {
    const price = readData && readData[0].result != undefined ? ethers.formatEther(readData[0].result.toString()) : null;
    const tokenPrice = readData && readData[1].result != undefined ? ethers.formatEther(readData[1].result.toString()) : null;
    setNftTokenPrice(tokenPrice)
    setNftPrice(price)
  }, [readData])

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Bloodline N° {tokenId}</h1>
      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <img src={`/nfts/${nftImg(tokenId)}`} className={styles.nft_media} />
          </div>
          <div className={styles.nft_info}>
            <p className={styles.text}>
              You can mint this NFT with Ethereum or YenToken
            </p>
            {isDisconnected ? (
              <p>Connect your wallet to get started</p>
            ) : (
              <>
                <BuyEth nftPrice={nftPrice} mint={mint} isLoading={isLoading} />

                <BuyYen nftPrice={nftTokenPrice} mint={mint} isLoading={isLoading} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}