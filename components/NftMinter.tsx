// Import CSS styles, and necessary modules from packages
import styles from "./css/NftMinter.module.css";
import { useAccount, useWalletClient, useContractWrite, usePrepareContractWrite } from "wagmi";
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

  const nftImg = (tokenId: number) => {
    if (tokenId > 100) {
      return `${tokenId}.jpg`;
    } else if (tokenId > 9) {
      return `0${tokenId}.jpg`;
    } else {
      return `00${tokenId}.jpg`;
    }
  }


  const { address, isDisconnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'userMint',
    args: [tokenId]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  async function mint() {
    write?.()
  }

  return (
    <div className={styles.box}>
      <h1 className={styles.nft_title}>Blood line N° {tokenId}</h1>
      <div className={styles.page_flexBox}>
        <div className={styles.page_container}>
          <div className={styles.nft_media_container}>
            <img src={`./nfts/${nftImg(tokenId)}`} className={styles.nft_media} />
          </div>

          <div className={styles.nft_info}>
            <h3 className={styles.nft_author}>By Alchemy.eth</h3>
            <p className={styles.text}>
              In the words of the ancients, one should make his decisions within the space of seven breaths. It is a matter of being determined and having the spirit to break through to the other side
            </p>
            <hr className={styles.break} />
            <h3 className={styles.nft_instructions_title}>INSTRUCTIONS</h3>
            <p className={styles.text}>
              You can get this NFT paying with Ethereum or YenToken
            </p>
            {isDisconnected ? (
              <p>Connect your wallet to get started</p>
            ) : (
              <div>
                <button
                  className={"bg-indigo-600 p-3 rounded-lg	text-white mt-2 w-full text-lg"}
                  disabled={!write} onClick={() => mint()}>
                  MINT NOW
                </button>
                {isLoading && <div>Check Wallet</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}