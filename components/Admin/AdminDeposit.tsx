'use client'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FaucetProps } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import { web3Address } from "@/dto/tokenDto";
import AmountInput from "./AmountInput";
import ActionButton from "./ActionButton";
import { useFaucetContract } from "@/hooks/useFaucetContract";
import YenIcon from "../YenIcon";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TapArrows from "../TapArrows";

export default function AdminDeposit({ faucetAddress, tokenAddress, faucetAbi, tokenAbi }: FaucetProps) {

    const [amountTo, setAmountTo] = useState('')
    const [currentAllowance, setCurrentAllowance] = useState('')
    const [showPanel, setShowPanel] = useState(false)

    const {
        needAllowance,
        faucetWrite: { data, isLoading, isError, isSuccess, write },
        tokenWrite: { data: dataAllowance, isLoading: loadingAllowance, isError: allowanceError, isSuccess: allowanceSuccess, write: setAllowance },
        readData: { data: allowanceAmount, isError: readError, isLoading: isReadLoading }
    } = useFaucetContract(faucetAddress as web3Address, tokenAddress as web3Address, faucetAbi, tokenAbi, amountTo);

    async function deposit() {
        console.log('exec deposit');

        if (Number(amountTo) < 1) {
            toast.warn('Amount should be greater than 1')
            return
        }
        try {
            write?.()
        } catch (error) {
            console.log("error", error);
        }
    }

    async function increaseAllowance() {
        console.log('exec allowance');

        if (Number(amountTo) < 1) {
            toast.warn('Amount should be greater than 1')
            return
        }
        try {
            setAllowance?.()
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleChange = (e: any) => {
        const value = e.target.value;
        if (parseFloat(value) < 0) {
            setAmountTo("0");
        } else {
            setAmountTo(value);
        }
    }

    useEffect(() => {
        console.log('allowanceAmount', allowanceAmount);
        const allowance = allowanceAmount && allowanceAmount[0].result != undefined ? parseInt(ethers.formatEther(allowanceAmount[0].result.toString())).toLocaleString() : '0';

        setCurrentAllowance(allowance)
        if (isSuccess) toast.success('Token successfully deposited!')
        if (isError) toast.warn('Error depositing, try again or contact support')
    }, [isSuccess, isError])

    return (
        <div className={`mt-4 text-left box`}>
            <div className="flex">
                <div className="w-1/2">
                    <h1 className="text-lg cursor-pointer"
                        onClick={() => setShowPanel(prev => !prev)}>
                        <TapArrows showPanel={showPanel} />
                        {needAllowance ? <span className="text-yellow-400">Need to increasse Token allowance</span> : 'Deposit to Faucet'}
                    </h1>
                </div>
                <div className="w-1/2 text-right">
                    Faucet allowance amount: {currentAllowance} <YenIcon />
                </div>
            </div>
            {
                showPanel
                && (
                    <div className="mt-3">
                        {needAllowance ? <span className="text-yellow-400">Max allowance amount</span> : <span className="text-sm">Amount to deposit in YenToken</span>}
                        <AmountInput value={amountTo} onChange={handleChange} />
                        <ActionButton
                            isLoading={isLoading}
                            needAllowance={needAllowance}
                            onIncreaseAllowance={increaseAllowance}
                            onDeposit={deposit}
                        />
                    </div>
                )
            }

        </div>
    );
}
