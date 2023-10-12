
import React from 'react'
import Image from 'next/image'
import UserAccountCard from './UserAccountCard'
import { StakeProps } from '@/hooks/useStaking';
import { Address } from '@/dto/tokenDto';
import { useStakingData } from '@/hooks/useStaking';

async function getContracts(): Promise<StakeProps> {
    const tokenStakingPlatformAddress = process.env.STAKINGPLATFORM_ADDRESS as Address | undefined;
    const escrowAddress = process.env.ESCROW_ADDRESS as Address | undefined;
    const stakingPoolAddress = process.env.ONE_DAY_POOL_ADDRESS as Address | undefined;
    const tokenAddress = process.env.YENTOKEN_ADDRESS as Address | undefined;

    return {
      escrowAddress: escrowAddress,
      stakingPoolAddress: stakingPoolAddress,
      tokenStakingPlatformAddress: tokenStakingPlatformAddress,
      tokenAddress: tokenAddress,
    }
  }
  
const PoolCard = async ({ duration, text, reward }: any) => {
    const { escrowAddress, stakingPoolAddress, tokenStakingPlatformAddress, tokenAddress } = await getContracts();


    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">

                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Samurai Staking Pool</dt>
                            <dd className="text-sm text-gray-500">Samurai Staking Pool</dd>
                        </div>
                        <div>
                            <dt className="sr-only">PoolType</dt>
                            <dd className="font-medium text-sm text-gray-500">{text}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-400">Duration</p>
                                <p className="font-medium text-violet-500">{duration}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-400">Reward</p>

                                <p className="font-medium text-violet-500">{reward}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg
                                className="h-4 w-4 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Status</p>

                                <p className="font-medium text-violet-500">Not Staking</p>
                            </div>
                        </div>
                    </div>
                    <UserAccountCard 
                        escrowAddress={escrowAddress}
                        stakingPoolAddress={stakingPoolAddress}
                        tokenStakingPlatformAddress={tokenStakingPlatformAddress}
                        tokenAddress={tokenAddress}
                    />
                
                </div>
            </a>
        </div>
    )
}

export default PoolCard