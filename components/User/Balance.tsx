'use client'
import YenIcon from "../YenIcon";
import { userStore } from "@/store/user";

export default function Balance() {

    const userAddress = userStore((state) => state.address)
    const userBalance = userStore((state) => state.tokenBalance)

    return (
        <div className={'bg-black rounded-lg p-2 border-2 border-gray-500'}>
            {
                (!userAddress || userAddress === '')
                    ?
                    <p>Connect your wallet...</p>
                    :
                    <>
                        Balance: {userBalance} <YenIcon />
                    </>
            }
        </div>
    )
}