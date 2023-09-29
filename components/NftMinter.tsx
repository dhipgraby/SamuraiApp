// Import CSS styles, and necessary modules from packages
import styles from "./css/NftMinter.module.css";
import { useAccount, useWalletClient, useContractWrite } from "wagmi";
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

  const { address, isDisconnected } = useAccount();
  const { data: signer } = useWalletClient();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'adminMint',    
  })

  console.log('address', address);


  return (
    <div className={styles.page_flexBox}>
      <div className={styles.page_container}>
        <div className={styles.nft_media_container}>
          <img src={"https://www.lastbloodlines.com/wp-content/uploads/2023/06/00370-2212875126-portrait-of-a-japanese-samurai-robot-against-a-ukiyo-e-city-background-at-night-incredibly-beautiful-ukiyo-e-design-incredible.jpg"} className={styles.nft_media} />
        </div>

        <div className={styles.nft_info}>
          <h1 className={styles.nft_title}>Create Web3 Dapp NFT</h1>
          <h3 className={styles.nft_author}>By Alchemy.eth</h3>
          <p className={styles.text}>
            Bootstrap a full stack dapp in 5 minutes with customizable
            components and project templates using Create Web3 Dapp.
          </p>
          <hr className={styles.break} />
          <h3 className={styles.nft_instructions_title}>INSTRUCTIONS</h3>
          <p className={styles.text}>
            This NFT is on MATIC Mumbai. You’ll need some test MATIC to mint the
            NFT. <a href="https://mumbaifaucet.com/">Get free test MATIC</a>
          </p>
          {isDisconnected ? (
            <p>Connect your wallet to get started</p>
          ) : (
            <div>
              <button
                className={"bg-indigo-600 p-3 rounded-lg	text-white mt-2 w-full text-lg"}
                disabled={!write} onClick={() => write?.({
                  args: [address, tokenId],
                })}>
                MINT NOW
              </button>
              {isLoading && <div>Check Wallet</div>}
              {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}