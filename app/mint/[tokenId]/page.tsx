'use client'
import NftMinter from "@/components/NftMinter";
import Navbar from "@/components/navigation";
import NFTContractAbi from "@/contracts/abi/samuraiAbi.json"
import YenTokenAbi from "@/contracts/abi/yenAbi.json"

export default function Page({ params }: { params: { tokenId: string } }) {

    const tokenId = Number(params.tokenId)

    return (
        <div>
            <Navbar />
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    Minter Dapp
                </h1>
                <small>Mint Unique a Blood Line character</small>
            </div>
            <NftMinter
                tokenId={tokenId}
                contractAddress={"0x5FbDB2315678afecb367f032d93F642f64180aa3"}
                abi={NFTContractAbi} />
        </div>
    )
}
