'use client'
import { useEffect, useState } from "react"
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { readContractDto } from "@/dto/tokenDto";
import { useContractReads } from "wagmi";
import YenIcon from "../YenIcon";
import TapArrows from "../TapArrows";

export default function TokenInfo({ address, abi }: readContractDto) {

    const [currentSupply, setCurrentSupply] = useState<string | null>(null)
    const [showPanel, setShowPanel] = useState(false)
    const tokenContract: readContractDto = {
        address,
        abi
    }

    const { data: readData, isError, isLoading: isReadLoading } = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'totalSupply',
            }
        ],
    });

    useEffect(() => {
        const supply = readData && readData[0].result != undefined ? parseInt(ethers.formatEther(readData[0].result.toString())).toLocaleString() : null;
        setCurrentSupply(supply)
    }, [readData])

    return (
        <>
            <div className={'box'}>
                <h1 className="text-lg cursor-pointer"
                    onClick={() => setShowPanel(prev => !prev)}>
                    <TapArrows showPanel={showPanel} />
                    Token info:
                </h1>
                {showPanel && (
                    currentSupply == null || isReadLoading ? ' Loading...' :
                        <ul className="my-2">
                            <li>Symbol: YEN</li>
                            <li>Current supply: {currentSupply} {<YenIcon />}</li>
                            <li>Total supply: 1,000,000,000  {<YenIcon />}</li>
                        </ul>
                )}
            </div>
        </>
    )
}