import { useEffect, useState } from "react";
import styles from "./css/NftMinter.module.css";
import MintWithEth from "./MintBtns/MintWithEth";
import MintWithYen from "./MintBtns/MintWithYen";
import Image from "next/image";
import { nftImg } from "@/helpers/nftHelper";
import { ethers } from "ethers";
import { parseAmount } from "@/helpers/converter";
import { useAccount } from "wagmi";
import { userStore } from "@/store/user";
import { useReadNftContract } from "@/hooks/useReadNftContract";
import { useAllowance } from "@/hooks/useAllowance";
import ConnectWalletBtn from "./ConnectWalletBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

interface minterProps {
  tokenId: number;
}

export default function NftMinter({ tokenId }: minterProps) {
  const { isDisconnected } = useAccount();

  const userAddress = userStore((state) => state.address);

  const [nftPrice, setNftPrice] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [nftTokenPrice, setNftTokenPrice] = useState("0");
  const [needAllowance, setNeedAllowance] = useState(true);
  const [isMinted, setIsMinted] = useState(false);
  const [totalAllowance, setTotalAllowance] = useState("");

  //ALLOWANCE FOR YEN TOKEN
  const { allowanceData } = useAllowance({
    tokenId,
    nftPrice,
    nftTokenPrice,
    totalAllowance,
    isMinted,
  });

  //INFORMATION ABOUT NFT CONTRACT, LIKE TOKEN PRICE OR OWNER OF
  const { initialPriceData, initialTokenPriceData, ownerOfData } =
    useReadNftContract({ tokenId });

  //Checking ownership
  useEffect(() => {
    if (ownerOfData) {
      setIsMinted(true);
    }
  }, [ownerOfData]);

  function setData(price: string, tokenPrice: string, allowance: string) {
    if (Number(allowance) >= Number(tokenPrice)) setNeedAllowance(false);
    setTotalAllowance(allowance);
    setNftTokenPrice(tokenPrice);
    setNftPrice(price);
  }

  //Setting nft price data
  useEffect(() => {
    console.log("triggering allowanceData", allowanceData);
    const price = parseAmount(initialPriceData);
    const tokenPrice = initialTokenPriceData
      ? ethers.formatEther(initialTokenPriceData)
      : "0";
    const allowance = allowanceData
      ? ethers.formatEther(allowanceData.toString())
      : "0";
    setData(price, tokenPrice, allowance);
    //eslint-disable-next-line
  }, [allowanceData]);

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Bloodline N° {tokenId}</h1>

      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <Image
              alt={"logo"}
              width={32}
              height={32}
              sizes={"max-width:100%"}
              src={`/nfts/${nftImg(tokenId)}`}
              className={styles.nft_media}
            />
          </div>
          {!isMinted && (
            <div className={styles.nft_info}>
              <>
                <p className={styles.text}>
                  You can mint this NFT with Ethereum or YenToken
                </p>
                {isDisconnected ||
                userAddress === "" ||
                userAddress.length < 10 ? (
                  <div>
                    <p>Connect your wallet to get started</p>
                    <ConnectWalletBtn className="mt-5" />
                  </div>
                ) : (
                  <>
                    {nftPrice !== null && nftTokenPrice !== null && (
                      <>
                        <p className="text-yellow-200 my-4">
                          Select Eth or Yen token
                        </p>
                        <div className="flex gap-5">
                          <button
                            onClick={() => setPaymentMethod(0)}
                            className={`w-40 bg-black rounded-lg p-1 border-2 ${
                              paymentMethod === 0
                                ? "border-yellow-500"
                                : "border-gray-500 text-slate-400"
                            }  text-3xl font-normal`}
                          >
                            <FontAwesomeIcon icon={faEthereum} />
                          </button>
                          <button
                            onClick={() => setPaymentMethod(1)}
                            className={`w-40 bg-black rounded-lg p-1 border-2 ${
                              paymentMethod === 1
                                ? "border-yellow-500"
                                : "border-gray-500 text-slate-400"
                            }  text-3xl font-normal`}
                          >
                            <FontAwesomeIcon icon={faYenSign} />
                          </button>
                        </div>
                        {paymentMethod === 0 ? (
                          <MintWithEth
                            nftPrice={nftPrice}
                            nftTokenPrice={nftTokenPrice}
                            tokenId={tokenId}
                            isMinted={isMinted}
                            setIsMinted={setIsMinted}
                            totalAllowance={totalAllowance}
                          />
                        ) : (
                          <MintWithYen
                            nftPrice={nftPrice}
                            nftTokenPrice={nftTokenPrice}
                            tokenId={tokenId}
                            isMinted={isMinted}
                            setIsMinted={setIsMinted}
                            totalAllowance={totalAllowance}
                            needAllowance={needAllowance}
                            setNeedAllowance={setNeedAllowance}
                            setTotalAllowance={setTotalAllowance}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            </div>
          )}
        </div>
      </div>
      {isMinted && (
        <div className="mt-3 ta-c">
          <p className="text-yellow-400 mb-3">Nft already minted</p>
          <button className="bg-sky-600 text-lg rounded-lg p-3 w-1/2">
            View in open sea
          </button>
        </div>
      )}
    </div>
  );
}
