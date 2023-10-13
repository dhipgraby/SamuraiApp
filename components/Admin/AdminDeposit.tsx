'use client'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FaucetProps } from "@/dto/tokenDto";
import { toast } from 'react-toastify'
import AmountInput from "./AmountInput";
import ActionButton from "./ActionButton";
import { useFaucetContract } from "@/hooks/useFaucetContract";
import YenIcon from "../YenIcon";
import TapArrows from "../TapArrows";
import { parseAmount } from "@/helpers/converter";

export default function AdminDeposit({ faucetAddress, tokenAddress, faucetAbi, tokenAbi }: FaucetProps) {

    const [amountTo, setAmountTo] = useState('')
    const [needAllowance, setNeedAllowance] = useState(false);
    const [currentAllowance, setCurrentAllowance] = useState('')
    const [showPanel, setShowPanel] = useState(false)
    const [loadingAmounts, setLoadingAmounts] = useState(true)
    const [faucetBalance, setFaucetBalance] = useState('0')

    const {
        depositToFaucet: { data, isLoading, isError, isSuccess, write },
        tokenWrite: { data: dataAllowance, isLoading: loadingAllowance, isError: allowanceError, isSuccess: allowanceSuccess, write: setAllowance },
        readData: { data: faucetData, refetch: getFaucetData, isError: readError, isLoading: isReadLoading }
    } = useFaucetContract({ faucetAddress, tokenAddress, faucetAbi, tokenAbi, amountTo });

    async function deposit() {

        const allowanceAmount = Number(currentAllowance.replace(",", ""))
        console.log('depositing');

        if (Number(amountTo) < 1) {
            toast.warn('Amount should be greater than 1')
            return
        }

        if (allowanceAmount < Number(amountTo)) {
            toast.warn('Amount should be greater or equal to Faucet allowance')
            return
        }
        console.log('should write');
        try {
            console.log('is writting', write);
            write?.()
        } catch (error) {
            console.log("error", error);
        }
    }

    async function increaseAllowance() {

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

    function setFaucetData(faucetData: any) {
        const allowance = faucetData && faucetData[0].result != undefined ? parseAmount(faucetData[0].result) : '0';
        const remainingTokens = faucetData && faucetData[1].result != undefined ? parseAmount(faucetData[1].result) : '0';
        setCurrentAllowance(allowance)
        setFaucetBalance(remainingTokens)
        const _allowance = Number(allowance.replace(",", ""))

        console.log("_allowance", _allowance);

        if (_allowance < 1000) {
            setNeedAllowance(true)
        } else {
            setNeedAllowance(false)
        }
    }

    async function refetchFaucetData() {
        const result = await getFaucetData()        
        setFaucetData(result.data)
    }

    useEffect(() => {
        setFaucetData(faucetData)
        setLoadingAmounts(isReadLoading)
    }, [isReadLoading, faucetData])

    // ----------------------------- ALERT MESSAGES -----------------------

    useEffect(() => {
        if (isSuccess) {
            toast.success('Token successfully deposited!');
            refetchFaucetData();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (allowanceSuccess) {
            toast.success('Allowance increased!');
            refetchFaucetData();
        }
    }, [allowanceSuccess]);

    useEffect(() => {
        if (allowanceError) toast.warn('Something went wrong with allowance. Try again');
    }, [allowanceError]);

    useEffect(() => {
        if (isError) toast.warn('Error depositing, try again or contact support');
    }, [isError]);

    return (
        <>
            <div className={`mt-4 text-left box`}>
                {loadingAmounts ? 'Loading balance...' : <div>Faucet balance: {faucetBalance} <YenIcon /></div>}
            </div>

            <div className={`mt-4 text-left box`}>
                <div className="flex">
                    <div className="w-1/2">
                        <h1 className="text-lg cursor-pointer"
                            onClick={() => setShowPanel(prev => !prev)}>
                            <TapArrows showPanel={showPanel} />
                            Deposit to Faucet
                        </h1>
                    </div>
                    <div className="w-1/2 text-right">
                        {loadingAmounts ? 'Loading allowance...' : <div>Faucet allowance amount: {currentAllowance} <YenIcon /></div>}
                    </div>
                </div>
                {
                    showPanel
                    && (
                        <div className="mt-3">
                            {needAllowance ?
                                <>
                                    <h2 className="text-yellow-400">Need to increasse Token allowance before depositing</h2>
                                    <span className="text-yellow-400">Max allowance amount</span>
                                </>
                                : <span className="text-sm">Amount to deposit in YenToken</span>}
                            <AmountInput value={amountTo} onChange={handleChange} />
                            <ActionButton
                                isLoading={isLoading}
                                loadingAllowance={loadingAllowance}
                                needAllowance={needAllowance}
                                onIncreaseAllowance={increaseAllowance}
                                onDeposit={deposit}
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
}
