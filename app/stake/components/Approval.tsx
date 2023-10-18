'use client'
import { pools } from "@/data/pools";
import { web3Address } from "@/dto/tokenDto";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { usePrepareAllowanceConfig } from "@/hooks/config/stakingConfig";
import { escrowContract, tokenContract } from "@/contracts/contractData";
import Link from "next/link";
import { parseEther } from "ethers";

const ApprovalButton = () => {
    const [stakeAmount, setStakeAmount] = useState("4000");

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        ...tokenContract,
        abi: tokenContract.abi,
        functionName: 'increaseAllowance',
        args: [escrowContract.address, parseEther("4000")],
    });
    const { data, error, isError, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log(data);  
        }
    })

    return (
        <div>
            <button disabled={!write || isLoading} className="text-white hover:text-gray-700" onSubmit={(e) => {
                e.preventDefault();
                write?.();
            }}>
                Approve
            </button>
            {isSuccess && (
                <div>
                    Successfully approved {stakeAmount}!
                    <div>
                        <Link href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</Link>
                    </div>
                </div>
            )}
            {isPrepareError || isError && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </div>
    );
};

export default ApprovalButton;
