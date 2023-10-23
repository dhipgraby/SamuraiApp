import { useEffect, useState } from "react"
import styles from "./css/NftMinter.module.css";
import BuyEth from "./BuyBtns/BuyEth";
import BuyYen from "./BuyBtns/BuyYen";
import { useAccount, useContractWrite, usePrepareContractWrite, useContractReads } from "wagmi";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";
import Image from "next/image";
import { toast } from "react-toastify";
import { parseAmount } from "@/helpers/converter";
import { useNftContract } from "@/hooks/useNftContract";

interface minterProps {
  tokenId: number
}

export default function NftMinter({
  tokenId
}: minterProps) {

  const { nftPrices, isLoading, isSuccess, isError, minNft } = useNftContract({ tokenId })

  const [nftPrice, setNftPrice] = useState<string | null>(null)
  const [nftTokenPrice, setNftTokenPrice] = useState<string | null>(null)

  const { isDisconnected } = useAccount();

  async function mint() {
    try {
      console.log('minting');
      minNft?.()
    } catch (error) {
      console.log('mint fail: ', error);
      toast.warn("Error minting. Try again or contact support")
    }

  }

  useEffect(() => {
    const price = nftPrices && nftPrices[0].result != undefined ? parseAmount(nftPrices[0].result) : null;    
    const tokenPrice = nftPrices && nftPrices[1].result != undefined ? ethers.formatEther(nftPrices[1].result.toString()) : null;
    setNftTokenPrice(tokenPrice)
    setNftPrice(price)
  }, [nftPrices])

  useEffect(() => {
    if (isSuccess) toast.success('You mint successfully bloodline #:' + tokenId)
  }, [isSuccess])

  useEffect(() => {
    if (isError) toast.warn('Mint error. Try again or contact support')
  }, [isError])

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Bloodline N° {tokenId}</h1>
      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <Image alt={'logo'} width={32} height={32} sizes={'max-width:100%'} src={`/nfts/${nftImg(tokenId)}`} className={styles.nft_media} />
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