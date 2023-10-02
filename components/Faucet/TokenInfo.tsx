import styles from "@/app/faucet/index.module.css"
import { useEffect, useState } from "react"
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import { readContractDto } from "@/dto/tokenDto";
import { useContractReads, useAccount } from "wagmi";


export default function TokenInfo({ address, abi }: readContractDto) {

    const yenIcon = <span className="text-yellow-400"><FontAwesomeIcon icon={faYenSign} /></span>

    const [currentSupply, setCurrentSupply] = useState<string | null>(null)
    const [userBalance, setUserBalance] = useState<string | null>(null)
    const { isDisconnected, address: userAddress } = useAccount();

    const tokenContract: readContractDto = {
        address,
        abi
    }

    const { data: readData, isError, isLoading: isReadLoading } = useContractReads({
        contracts: [
            {
                ...tokenContract,
                functionName: 'totalSupply',
            },
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: userAddress ? [userAddress] : [],
            },
        ],
    });

    useEffect(() => {
        console.log("readData", readData);
        const supply = readData && readData[0].result != undefined ? parseInt(ethers.formatEther(readData[0].result.toString())).toLocaleString() : null;
        const balanceOf = readData && readData[1].result != undefined ? parseInt(ethers.formatEther(readData[1].result.toString())).toLocaleString() : null;
        setUserBalance(balanceOf)
        setCurrentSupply(supply)
    }, [readData])

    return (
        <>
            <div className="mt-5 text-center">
                <h1 className="text-xl">
                    Come claim every 24 hours free Yen Token.
                    <br />
                    You can buy <span className="text-yellow-400">Blood Lines</span> NFT's with Yen Token.
                    <br />
                    Aditionally you can stake <span className="text-yellow-400">Yen Pools</span>
                    <br />
                    support the community and increasse your earnings
                </h1>
            </div>
            {isDisconnected ?
                <div className={styles.box}>
                    Balance: Connect your wallet
                </div>
                :
                userBalance != null &&
                <div className={styles.box}>
                    Balance: {userBalance} {yenIcon}
                </div>
            }

            <div className={styles.box}>
                <FontAwesomeIcon icon={faExclamationCircle} /> Token info:
                {currentSupply == null || isReadLoading ? ' Loading...' :
                    <ul className="my-2">
                        <li>Symbol: LBL</li>
                        <li>Current supply: {currentSupply} {yenIcon}</li>
                        <li>Total supply: 1,000,000,000  {yenIcon}</li>
                    </ul>}
            </div>
        </>
    )
}