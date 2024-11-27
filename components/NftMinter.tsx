import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import styles from "./css/NftMinter.module.css";
import MintWithEth from "./MintBtns/MintWithEth";
import MintWithYen from "./MintBtns/MintWithYen";
import { nftImg } from "@/helpers/nftHelper";
import { parseAmount } from "@/helpers/converter";
import { useReadNftContract } from "@/hooks/useReadNftContract";
import { useAllowance } from "@/hooks/useAllowance";
import ConnectWalletBtn from "./ConnectWalletBtn";
import { useUserAddress } from "@/queries/user.queries";

interface MinterProps {
  tokenId: number;
}

export default function NftMinter({ tokenId }: MinterProps) {
  const { isDisconnected } = useAccount();
  const userAddress = useUserAddress().toString();

  const [nftPrice, setNftPrice] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [nftTokenPrice, setNftTokenPrice] = useState("0");
  const [needAllowance, setNeedAllowance] = useState(true);
  const [isMinted, setIsMinted] = useState(false);
  const [totalAllowance, setTotalAllowance] = useState("");

  // Backend data states
  const [isBackendMinted, setIsBackendMinted] = useState(false);
  const [backendFetched, setBackendFetched] = useState(false);
  const [backendError, setBackendError] = useState(false);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Backend fetch
  useEffect(() => {
    async function fetchNftStatus() {
      try {
        const response = await fetch(
          `http://localhost:3003/nfts/status/${tokenId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // setIsBackendMinted(data.isMinted);
        setBackendFetched(true);
        setIsMinted(data.isMinted); // Sync with backend
        setBackendError(false);
      } catch (error) {
        console.error("Failed to fetch NFT status:", error);
        setBackendError(true);
      } finally {
        // Only set loading to false if there's no backend error
        if (!backendError) {
          setIsLoading(false);
        }
      }
    }
    fetchNftStatus();
  }, [tokenId]);

  // Hook logic (always called)
  const { allowanceData } = useAllowance({
    tokenId,
    nftPrice,
    nftTokenPrice,
    totalAllowance,
    isMinted: isBackendMinted, // Use backend state to decide usage
  });

  const { initialPriceData, initialTokenPriceData, ownerOfData } =
    useReadNftContract({ tokenId });

  async function recoverMintStatus() {
    const response = await fetch("http://localhost:3003/nfts/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nftId: tokenId,
        owner: ownerOfData,
        token: "YEN",
      }),
    });
    console.log(
      JSON.stringify({ nftId: tokenId, owner: ownerOfData, token: "YEN" })
    ),
      console.log("response", response);
  }
  // Set minting status
  useEffect(() => {
    if (ownerOfData && !isBackendMinted) {
      console.log("Minting NFT");
      setIsMinted(true);
      recoverMintStatus();
      return;
    }
  }, [ownerOfData]);

  function setData(price: string, tokenPrice: string, allowance: string) {
    if (Number(allowance) >= Number(tokenPrice)) setNeedAllowance(false);
    else setNeedAllowance(true);
    setTotalAllowance(allowance);
    setNftTokenPrice(tokenPrice);
    setNftPrice(price);
  }

  // Setting NFT price data
  useEffect(() => {
    const price = parseAmount(initialPriceData);
    const tokenPrice = initialTokenPriceData
      ? ethers.formatEther(initialTokenPriceData)
      : "0";
    const allowance = allowanceData
      ? ethers.formatEther(allowanceData.toString())
      : "0";
    setData(price, tokenPrice, allowance);

    // Set loading to false once hooks have finished fetching
    if (backendError) {
      setIsLoading(false);
    }
  }, [
    allowanceData,
    initialPriceData,
    initialTokenPriceData,
    backendError,
    userAddress,
  ]);

  if (isLoading) {
    return (
      <div className={styles.box}>
        <h1 className={styles.nft_title}>Loading...</h1>
        <div className={styles.page_flexBox}>
          <div className={styles.page_container}>
            <div className={styles.nft_media_container}>
              <div className="animate-pulse bg-gray-300 w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {isMinted && (
              <div className="mt-3 ta-c">
                <p className="text-yellow-400 mb-3">NFT already minted</p>
                <button className="bg-sky-600 text-lg rounded-lg p-3 w-1/2">
                  View in OpenSea
                </button>
              </div>
            )}
          </div>
          {!isMinted && (
            <div className={styles.nft_info}>
              {isDisconnected ||
              userAddress === "" ||
              userAddress.length < 10 ? (
                <div>
                  <p>Connect your wallet to get started</p>
                  <ConnectWalletBtn className="mt-5" />
                </div>
              ) : (
                <>
                  <p className={styles.text}>
                    You can mint this NFT with Ethereum or YenToken
                  </p>
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
                      } text-3xl font-normal`}
                    >
                      <FontAwesomeIcon icon={faEthereum} />
                    </button>
                    <button
                      onClick={() => setPaymentMethod(1)}
                      className={`w-40 bg-black rounded-lg p-1 border-2 ${
                        paymentMethod === 1
                          ? "border-yellow-500"
                          : "border-gray-500 text-slate-400"
                      } text-3xl font-normal`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
