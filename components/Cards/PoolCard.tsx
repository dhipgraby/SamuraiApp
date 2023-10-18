import React from 'react'
import StakingPositions from './StakingPositions'
import { PoolProps } from '@/dto/stakingDto'
import Calendar from '@/public/icons/calendar.png'
import YenGold from '@/public/icons/yengold.png'
import YenBasic from '@/public/icons/yenbasic.png'
import Bag from '@/public/icons/rewardredbox.png'
import Fire from '@/public/icons/fire.png'
import Image from 'next/image'
import InputStakeForm from '../Inputs/InputStakeForm'

const PoolCard: React.FC<PoolProps> = ({ id, duration, text, reward, stakeIds }) => {

    return (
        <>
            <div>
                <div className="pt-8 pb-5">
                    <div className='cloudsBg rounded-lg overflow-hidden cursor-pointer'>
                        <div className="h-52">
                            <h1 className="font-medium text-xl bg-black py-3 block">{text}</h1>
                            <Image className='mt-5' width={120} height={120} src={(id < 3) ? YenBasic : YenGold} alt="yentoken" />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-8 text-sm box">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image width={32} height={32} src={Calendar} alt="bank" />

                            <div className="mt-1.5 sm:mt-0">
                                <p>Duration</p>
                                <p className="font-medium text-yellow-400">{duration}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image width={38} height={38} src={Bag} alt="Rocket" />

                            <div className="mt-1.5 sm:mt-0">
                                <p>Reward</p>

                                <p className="font-medium text-yellow-400">{reward}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <Image className={(stakeIds?.length) ? "" : "greyScale"} width={38} height={38} src={Fire} alt="Status" />

                            <div className="mt-1.5 sm:mt-0">
                                <p>Status</p>
                                <p className="font-medium text-yellow-400">
                                    {stakeIds?.length ? `Staking (${stakeIds?.length})` : "Not Staking"}
                                </p>
                            </div>
                        </div>
                    </div>
                    {(stakeIds && stakeIds?.length > 0) && <StakingPositions stakeData={stakeIds} />}
                </div>
            </div>
            <InputStakeForm poolId={id}
            />
        </>
    )
}

export default PoolCard