"use client";
import NftMinter from "@/components/NftMinter";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { tokenId: string } }) {
  const router = useRouter();
  const tokenId = Number(params.tokenId);

  return (
    <div>
      <div className={"text-center"}>
        <div className="flex justify-between">
          <Button
            className="flex text-white bg-transparent"
            onClick={() => router.push("/mint")}
          >
            <IoIosArrowBack className="text-2xl rounded-full cursor-pointer me-2" />
            <p>Back</p>
          </Button>
          <Button
            className="flex text-white bg-transparent"
            onClick={() => router.push(`/mint/${tokenId + 1}`)}
          >
            <p>Next Bloodline</p>
            <IoIosArrowForward className="text-2xl rounded-full cursor-pointer ms-2" />
          </Button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold underline">Minter Dapp</h1>
          <small>Mint Unique a Bloodline character</small>
        </div>
      </div>
      <NftMinter tokenId={tokenId} />
    </div>
  );
}
