import { useEffect, useState } from "react"
import styles from "./css/NftMinter.module.css";
import BuyEth from "./BuyBtns/BuyEth";
import BuyYen from "./BuyBtns/BuyYen";
import Image from "next/image";
import { useAccount } from "wagmi";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { parseAmount } from "@/helpers/converter";
import { useNftContract } from "@/hooks/useNftContract";
import { shortAddr, handleCopyClick } from "@/helpers/converter";

import { userStore } from "@/store/user";
import { useReadNftContract } from "@/hooks/useReadNftContract";
import ConnectWalletBtn from "./ConnectWalletBtn";

interface minterProps {
  tokenId: number
}

export default function NftMinter({
  tokenId
}: minterProps) {

  const userAddress = userStore((state) => state.address)
  const [nftPrice, setNftPrice] = useState('0')
  const [nftTokenPrice, setNftTokenPrice] = useState('0')
  const [needAllowance, setNeedAllowance] = useState(true)
  const [isMinted, setIsMinted] = useState(true)
  const [totalAllowance, setTotalAllowance] = useState('')

  const {
    isLoading,
    loadingTokenMint,
    loadingAllowance,
    isSuccess,
    successTokenMint,
    successAllowance,
    isError,
    errorTokenMint,
    errorAllowance,
    approve,
    minNft,
    mintNftWithToken,
    submitTxDataAllowance,
    submitTxAllowanceLoading,
    submitTxAllowanceSuccess,
    loadingTxMintWithToken,
    isSuccessTxMintWithToken,
    isErrorTxMintWithToken,
    setAmount } = useNftContract({ tokenId, nftTokenPrice, totalAllowance, isMinted })

  const {
    allowanceData,
    refetchAllowance,
    initialPriceData,
    refetchInitialPrice,
    initialTokenPriceData,
    refetchInitialTokenPrice,
    ownerOfData,
    refetchownerOf
  } = useReadNftContract({ tokenId })

  const { isDisconnected } = useAccount();

  async function approveSpend() {
    try {
      console.log('approving');
      approve?.()
    } catch (error) {
      console.log('mint fail: ', error);
      toast.warn("Error minting. Try again or contact support")
    }
  }

  async function mint() {
    try {
      console.log('minting');
      minNft?.()
    } catch (error) {
      console.log('mint fail: ', error);
      toast.warn("Error minting. Try again or contact support")
    }
  }

  async function mintWithToken() {
    try {
      console.log('minting usin yen');
      console.log('mintNftWithToken', mintNftWithToken);

      mintNftWithToken?.()
    } catch (error) {
      console.log('mint with yen fail: ', error);
      toast.warn("Error minting. Try again or contact support")
    }
  }

  function setData(price: string, tokenPrice: string, allowance: string) {

    if (Number(allowance) >= Number(tokenPrice)) setNeedAllowance(false)
    if (tokenPrice !== null) setAmount(tokenPrice)
    setTotalAllowance(allowance)
    setNftTokenPrice(tokenPrice)
    setNftPrice(price)
  }

  useEffect(() => {
    if (!ownerOfData) {
      setIsMinted(false)
    }
  }, [ownerOfData])

  useEffect(() => {

    const price = parseAmount(initialPriceData);
    const tokenPrice = (initialTokenPriceData) ? ethers.formatEther(initialTokenPriceData) : '0';
    const allowance = (allowanceData) ? ethers.formatEther(allowanceData.toString()) : '0';

    console.log("allowanceData", allowanceData);
    console.log("initialPriceData", initialPriceData);
    console.log("initialTokenPriceData", initialTokenPriceData);

    setData(price, tokenPrice, allowance)

  }, [])

  useEffect(() => {

    if (isSuccessTxMintWithToken) {
      toast.success('You mint successfully bloodline #:' + tokenId)
      setIsMinted(true)
      return
    }

    if (isSuccess || successTokenMint) {
      toast.success('Transaction sent for bloodline #:' + tokenId)
      setIsMinted(true)
      return
    }

  }, [isSuccess, successTokenMint, isSuccessTxMintWithToken])

  useEffect(() => {
    if (isError) toast.warn(`Mint error. Try again or contact support:  ${isError}`)
    if (errorTokenMint) toast.warn(`Mint with Token error. Try again or contact support:  ${errorTokenMint}`)
  }, [isError, errorTokenMint])

  // wait for txn
  useEffect(() => {

    if (submitTxAllowanceSuccess) {
      toast.success('Approval success, ready to mint with Yen token')
      setNeedAllowance(false)
      setTotalAllowance(nftTokenPrice)
      return
    }

    if (successAllowance) {
      toast.success('Approving contract...')
      setNeedAllowance(false)
      setTotalAllowance(nftTokenPrice)
      return
    }

  }, [successAllowance, submitTxAllowanceSuccess])

  useEffect(() => {
    if (errorAllowance) toast.warn('Approval error. Try again or contact support')
  }, [errorAllowance])

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Bloodline N° {tokenId}</h1>

      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <Image alt={'logo'} width={32} height={32} sizes={'max-width:100%'} src={`/nfts/${nftImg(tokenId)}`} className={styles.nft_media} />
          </div>
          {(!isMinted) && (

            <div className={styles.nft_info}>
              <>
                <p className={styles.text}>
                  You can mint this NFT with Ethereum or YenToken
                </p>
                {(isDisconnected || userAddress === '' || userAddress.length < 10) ?
                  <div>
                    <p>Connect your wallet to get started</p>
                    <ConnectWalletBtn className="mt-5" />
                  </div>
                  :
                  <>
                    {nftPrice !== null && nftTokenPrice !== null &&
                      (
                        <>
                          <BuyEth nftPrice={nftPrice} mint={mint} isLoading={isLoading} />
                          <BuyYen
                            nftPrice={nftTokenPrice}
                            mint={mintWithToken}
                            needAllowance={needAllowance}
                            approveSpend={approveSpend}
                            loadingAllowance={loadingAllowance}
                            isLoading={loadingTokenMint} />
                        </>
                      )
                    }
                  </>
                }
              </>
            </div>
          )}

        </div>
      </div>
      {(isMinted) && (
        <div className="mt-3 ta-c">
          <p className="text-yellow-400 mb-3">Nft already minted</p>
          <button className="bg-sky-600 text-lg rounded-lg p-3 w-1/2">View in open sea</button>
        </div>
      )}
    </div>
  );
}
