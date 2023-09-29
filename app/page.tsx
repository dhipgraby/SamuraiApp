'use client'
import styles from "./page.module.css";
import "./globals.css";
import NftMinter from "@/components/NftMinter"
import NFTContractAbi from "@/contracts/abi/samuraiAbi.json"
import YenTokenAbi from "@/contracts/abi/yenAbi.json"

export default function Home() {
  return (
    <main className={`${styles.main}`}>
      <div className={"text-center"}>
        <h1 className="text-3xl font-bold underline">
          Minter Dapp
        </h1>
        <small>Mint Unique a Blood Line character</small>
      </div>


      <NftMinter
        tokenId={4}
        contractAddress={"0x5FbDB2315678afecb367f032d93F642f64180aa3"}
        abi={NFTContractAbi} />
    </main>
  );
}
