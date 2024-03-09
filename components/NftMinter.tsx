import { useEffect, useState } from "react"
import styles from "./css/NftMinter.module.css";
import MintWithEth from "./MintBtns/MintWithEth"
import Image from "next/image";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";
import { parseAmount } from "@/helpers/converter";
import { useAccount } from "wagmi";
import { userStore } from "@/store/user";
import { useReadNftContract } from "@/hooks/useReadNftContract";
import { useAllowance } from "@/hooks/useAllowance";
import ConnectWalletBtn from "./ConnectWalletBtn";

interface minterProps {
  tokenId: number
}

export default function NftMinter({
  tokenId
}: minterProps) {

  const { isDisconnected } = useAccount();

  const userAddress = userStore((state) => state.address)
  const [nftPrice, setNftPrice] = useState('0')
  const [nftTokenPrice, setNftTokenPrice] = useState('0')
  const [needAllowance, setNeedAllowance] = useState(true)
  const [isMinted, setIsMinted] = useState(true)
  const [totalAllowance, setTotalAllowance] = useState('')

  //ALLOWANCE FOR YEN TOKEN 
  const {
    allowanceData,
    successAllowance,
    errorAllowance,
    submitTxAllowanceSuccess,
    setAmount,
    submitTxAllowanceError,
  } = useAllowance({ tokenId, nftPrice, nftTokenPrice, totalAllowance, isMinted })

  //INFORMATION ABOUT NFT CONTRACT, LIKE TOKEN PRICE OR OWNER OF
  const {
    initialPriceData,
    initialTokenPriceData,
    ownerOfData,
  } = useReadNftContract({ tokenId })

  function setData(price: string, tokenPrice: string, allowance: string) {
    if (Number(allowance) >= Number(tokenPrice)) setNeedAllowance(false)
    if (tokenPrice !== null) setAmount(tokenPrice)
    setTotalAllowance(allowance)
    setNftTokenPrice(tokenPrice)
    setNftPrice(price)
  }

  //Checking ownership
  useEffect(() => {
    if (!ownerOfData) {
      setIsMinted(false)
    }
  }, [ownerOfData])

  //Setting nft price data
  useEffect(() => {
    const price = parseAmount(initialPriceData);
    const tokenPrice = (initialTokenPriceData) ? ethers.formatEther(initialTokenPriceData) : '0';
    const allowance = (allowanceData) ? ethers.formatEther(allowanceData.toString()) : '0';
    setData(price, tokenPrice, allowance)
  }, [])

  // // Success Allowance
  // useEffect(() => {
  //   if (submitTxAllowanceSuccess) {
  //     toast.success('Approval success, ready to mint with Yen token')
  //     setNeedAllowance(false)
  //     setTotalAllowance(nftTokenPrice)
  //     return
  //   }

  //   if (successAllowance) {
  //     toast.success('Approving contract...')
  //     setNeedAllowance(false)
  //     setTotalAllowance(nftTokenPrice)
  //     return
  //   }

  // }, [successAllowance, submitTxAllowanceSuccess])

  // // Error Allowance
  // useEffect(() => {
  //   if (errorAllowance || submitTxAllowanceError) toast.warn('Approval error. Try again or contact support')
  // }, [errorAllowance, submitTxAllowanceError])

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
                          <MintWithEth
                            nftPrice={nftPrice}
                            nftTokenPrice={nftTokenPrice}
                            tokenId={tokenId}
                            isMinted={isMinted}
                            setIsMinted={setIsMinted}
                            totalAllowance={totalAllowance}
                          />
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
