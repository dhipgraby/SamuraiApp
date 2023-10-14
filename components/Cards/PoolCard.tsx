// components/Cards/PoolCard.tsx
import React from 'react'
import UserAccountCard from './UserAccountCard'
import { PoolCardProps } from '@/dto/stakingDto'
import bankIcon from '@/public/icons/bank.svg'
import starsIcon from '@/public/icons/stars.svg'
import moonIcon from '@/public/icons/moon.svg'
import Image from 'next/image'

const PoolCard: React.FC<PoolCardProps> = async ({ duration, text, reward }) => {
    //const isUserStakingInThisPool = userStakeData && /* logic to determine if user is staking in this pool based on userStakeData */;

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
                            <Image className="h-4 w-4 text-indigo-700" src={bankIcon} alt="bank" />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Duration</p>
                                <p className="font-medium text-violet-500">{duration}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image className="h-4 w-4 text-indigo-700" src={starsIcon} alt="stars" />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Reward</p>

                                <p className="font-medium text-violet-500">{reward}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image className="h-4 w-4 text-indigo-700" src={moonIcon} alt="moon" />

                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Status</p>
                                <p className="font-medium text-violet-500">
                                    {/*isUserStakingInThisPool ? "Staking" : "Not Staking"*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <UserAccountCard />

                </div>
            </a>
        </div>
    )
}

export default PoolCard