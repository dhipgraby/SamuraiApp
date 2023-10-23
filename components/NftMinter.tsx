import { useEffect, useState } from "react"
import styles from "./css/NftMinter.module.css";
import BuyEth from "./BuyBtns/BuyEth";
import BuyYen from "./BuyBtns/BuyYen";
import { useAccount } from "wagmi";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";
import Image from "next/image";
import { toast } from "react-toastify";
import { parseAmount } from "@/helpers/converter";
import { useNftContract } from "@/hooks/useNftContract";
import { shortAddr, handleCopyClick } from "@/helpers/converter";
import { userStore } from "@/store/user";

interface minterProps {
  tokenId: number
}

export default function NftMinter({
  tokenId
}: minterProps) {

  const userAddress = userStore((state) => state.address)
  const [nftPrice, setNftPrice] = useState<string | null>(null)
  const [nftTokenPrice, setNftTokenPrice] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [tokenOwner, setTokenOwner] = useState<string | null>(null)
  const [needAllowance, setNeedAllowance] = useState(true)
  const [amount, setAmount] = useState('')

  const {
    nftData,
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
    minNftWithToken } = useNftContract({ tokenId, setErrorMsg, amount })

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
      minNftWithToken?.()
    } catch (error) {
      console.log('mint with yen fail: ', error);
      toast.warn("Error minting. Try again or contact support")
    }
  }

  useEffect(() => {
    const price = nftData && nftData[0].result != undefined ? parseAmount(nftData[0].result) : null;
    const tokenPrice = nftData && nftData[1].result != undefined ? ethers.formatEther(nftData[1].result.toString()) : null;
    const owner = nftData && nftData[2].result != undefined ? nftData[2].result.toString().toLowerCase() : null;
    const allowance = nftData && nftData[3].result != undefined ? ethers.formatEther(nftData[3].result.toString()) : null;

    console.log("allowance", allowance);

    if (Number(allowance) >= Number(tokenPrice)) setNeedAllowance(false)
    if (tokenPrice != null) setAmount(tokenPrice)
    setTokenOwner(owner)
    setNftTokenPrice(tokenPrice)
    setNftPrice(price)
  }, [nftData])

  useEffect(() => {
    if (isSuccess || successTokenMint) {
      toast.success('You mint successfully bloodline #:' + tokenId)
      setTokenOwner(userAddress)
    }
  }, [isSuccess, successTokenMint])

  useEffect(() => {
    if (isError || errorTokenMint) toast.warn('Mint error. Try again or contact support')
  }, [isError, errorTokenMint])

  useEffect(() => {
    if (successAllowance) {
      toast.success('Approval success, ready to mint with Yen token')
      setNeedAllowance(false)
    }
  }, [successAllowance])

  useEffect(() => {
    if (errorAllowance) toast.warn('Approval error. Try again or contact support')
  }, [errorAllowance])

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Bloodline N° {tokenId}</h1>

      {(errorMsg === 'token exist') &&
        <>
          {(tokenOwner === userAddress.toLowerCase())
            ?
            <p>Owner: You </p>
            :
            <p className="cursor-pointer" onClick={() => handleCopyClick(tokenOwner, () => toast.info('Address copied!'))}>Owner: {shortAddr(tokenOwner)} </p>
          }
        </>
      }

      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <Image alt={'logo'} width={32} height={32} sizes={'max-width:100%'} src={`/nfts/${nftImg(tokenId)}`} className={styles.nft_media} />
          </div>
          {(tokenOwner !== userAddress.toLowerCase()) &&
            <div className={styles.nft_info}>

              {(errorMsg.length > 1 || errorMsg === 'token exist' || tokenOwner?.length) ?
                <>
                  <p>Nft already minted</p>
                  <button className="bg-sky-600 text-lg rounded-lg p-3">View in open sea</button>
                </>
                :
                <>
                  <p className={styles.text}>
                    You can mint this NFT with Ethereum or YenToken
                  </p>
                  {(isDisconnected || userAddress === '' || userAddress.length < 10) ?
                    <p>Connect your wallet to get started</p>
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
              }
            </div>
          }

        </div>
      </div>
    </div>
  );
}
