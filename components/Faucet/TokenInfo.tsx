"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useReadContract } from "wagmi";
import YenIcon from "../YenIcon";
import TapArrows from "../TapArrows";
import { tokenContract } from "@/contracts/contractData";

export default function TokenInfo() {
  const [currentSupply, setCurrentSupply] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const { data: readData, isLoading: isReadLoading } = useReadContract({
    ...tokenContract,
    functionName: "totalSupply",
  });

  useEffect(() => {
    const supply =
      readData && readData[0].result != undefined
        ? parseInt(
            ethers.formatEther(readData[0].result.toString())
          ).toLocaleString()
        : null;
    setCurrentSupply(supply);
  }, [readData]);

  return (
    <>
      <div className={"box"}>
        <h1
          className="text-lg cursor-pointer"
          onClick={() => setShowPanel((prev) => !prev)}
        >
          <TapArrows showPanel={showPanel} />
          Token info:
        </h1>
        {showPanel &&
          (currentSupply == null || isReadLoading ? (
            " Loading..."
          ) : (
            <ul className="my-2">
              <li>Symbol: YEN</li>
              <li>
                Current supply: {currentSupply} {<YenIcon />}
              </li>
              <li>Max supply: 6,000,000,000 {<YenIcon />}</li>
            </ul>
          ))}
      </div>
    </>
  );
}
