'use client'
import { stakingPlatformContract } from "@/contracts/contractData";
import { pools } from "@/data/pools";
import { web3Address } from "@/dto/tokenDto";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseEther } from "ethers/utils";
import { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { poolsInfo } from '../../data/pools/index';
import Link from "next/link";


const InputStakeForm = ({ poolId }: any) => {
  const [stakeAmount, setStakeAmount] = useState("");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: pools[poolId].address as web3Address,
    abi: [{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }],
    functionName: 'stake',
    value: parseEther("0.0009"),
    args: [stakeAmount],
    enabled: Boolean(stakeAmount),
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setStakeAmount("");
    },
  })

  return (
    <>
      <form
        className="bg-black relative"
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <label htmlFor="stake_yen" className="sr-only">
          Stake Yen
        </label>
        <input
          id="stake_yen"
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Stake Yen"
          className="w-full rounded-lg border-2 py-2.5 pe-10 sm:text-sm bg-black text-white overflow-hidden"
          value={stakeAmount}
          min={0}
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button disabled={!write || isLoading} className="text-white hover:text-gray-700">
            {
              isLoading ? <FontAwesomeIcon className="text-gray-200 opacity-60" icon={faPaperPlane} />
                : <FontAwesomeIcon className="text-yellow-400" icon={faPaperPlane} />
            }
          </button>
        </span>
      </form>
      <div>
        {isSuccess && (
          <div>
            Successfully Staked {stakeAmount} in {poolsInfo[poolId].name}!
            <div>
              <Link href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</Link>
            </div>
          </div>
        )}
        {isPrepareError || isError && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    </>
  );
};

export default InputStakeForm;
