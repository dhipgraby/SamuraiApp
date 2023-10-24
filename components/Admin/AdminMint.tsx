'use client'
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";
import { web3Address } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import YenIcon from "../YenIcon";
import TapArrows from "../TapArrows";
import { tokenContract } from "@/contracts/contractData";

export default function AdminMint() {


    const [addressTo, setAddressTo] = useState('')
    const [amountTo, setAmountTo] = useState('0')
    const [showPanel, setShowPanel] = useState(false)

    const { config } = usePrepareContractWrite({
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: 'mint',
        enabled: Boolean(addressTo !== undefined && addressTo !== ''),
        args: [addressTo as web3Address, ethers.parseEther(amountTo)],
    })

    const { data, isLoading, isError, isSuccess, write } = useContractWrite(config)

    async function mint() {
        if (Number(amountTo) < 1) {
            toast.warn('Amount should be greater than 1')
            return
        }
        write?.()
    }

    useEffect(() => {
        if (isSuccess) toast.success('Token successfully minted!')
        if (isError) toast.warn('Error minting, try again or contact support')
    }, [isSuccess, isError])

    return (
        <div>
            <div className={`mt-4 text-center`}>

                <div className={`box text-left`} >
                    <h1 className="text-lg cursor-pointer"
                        onClick={() => setShowPanel(prev => !prev)}
                    >
                        <TapArrows showPanel={showPanel} />Mint Yen token
                    </h1>

                    {showPanel && (
                        <>
                            <div className="flex mt-3">
                                <div className="sm:w-full w-1/3">
                                    <span className="block text-sm block">Send To</span>
                                    <input
                                        onChange={(e) => setAddressTo(e.target.value)}
                                        value={addressTo}
                                        placeholder="Address"
                                        className="p-1 rounded block my-2 text-black" />
                                </div>
                                <div className="sm:w-full w-1/3">
                                    <span className="block text-sm block">Amount</span>
                                    <input
                                        onChange={(e) => setAmountTo(e.target.value)}
                                        value={amountTo}
                                        type="number"
                                        placeholder="Amount"
                                        className="p-1 rounded block my-2 text-black" />
                                </div>
                            </div>
                            <button
                                disabled={isLoading}
                                onClick={() => mint()}
                                className={`bg-white text-black p-2 rounded-lg text-lg`}
                            >
                                {isLoading ? "MINTING..." : "MINT TOKENS"} <YenIcon />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div >
    );

}

