'use client'
import NftMinter from "@/components/NftMinter";
import NFTContractAbi from "@/contracts/abi/samuraiAbi.json"

export default function Page({ params }: { params: { tokenId: string } }) {

    const tokenId = Number(params.tokenId)

    return (
        <div>
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    Minter Dapp
                </h1>
                <small>Mint Unique a Bloodline character</small>
            </div>
            <NftMinter
                tokenId={tokenId}
                contractAddress={"0x5FbDB2315678afecb367f032d93F642f64180aa3"}
                abi={NFTContractAbi} />
        </div>
    )
}
