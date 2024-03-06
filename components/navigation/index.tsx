'use client'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Balance from "../User/Balance";
import ConnectWalletBtn from "../ConnectWalletBtn";

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <nav className='dark-theme relative flex items-center min-w-screen'>

                <ul className='desktopMenu p-4 w-full h-20 gap-4 lg items-center justify-between sm:flex'>
                    <li className='flex gap-8 justify-between items-center'>
                        <Link href="/">
                            <span className='items-center flex gap-2 flex'>
                                <span className="logo material-symbols-outlined">
                                    <Image alt={'logo'} width={32} height={32} src="/graphic_icon.jpg" className={"icon rounded-full"} />
                                </span>
                                <span className="hidden md:flex">
                                    Last Bloodlines
                                </span>
                            </span>
                        </Link>
                        <Link href="/faucet" className="px-4 py-2">Claim</Link>
                        <Link href="/mint" className="px-4 py-2">Releases</Link>
                        <Link href="/stake" className="px-4 py-2">Staking Pools</Link>
                        <Link href="/about" className="px-4 py-2">About</Link>
                    </li>

                    <li className='flex gap-1 w-fit justify-end self-center'>
                        <Balance />
                        <ConnectWalletBtn />
                    </li>
                </ul>

                <ul className='mobileMenu bg-black flex p-3 w-full items-center justify-between'>
                    <li onClick={() => setShowMenu(prev => !prev)} className='w-1/4 pt-1 ml-3 cursor-pointer'>
                        <span className="menu material-symbols-outlined">
                            <FontAwesomeIcon icon={(showMenu) ? faClose : faBars} />
                        </span>
                    </li>
                    <li className="mx-auto w-fit">
                        <Balance />
                    </li>
                    <li className='w-1/4 pt-1 ta-r'>
                        <Link href={"/"}>
                            <span className="logo material-symbols-outlined">
                                <Image alt={'logo'} width={32} height={32} src="/graphic_icon.jpg" className={"icon"} />
                            </span>
                        </Link>
                    </li>
                </ul>

            </nav>

            {/* Conditionally render dropdown based on showMenu state */}
            <ul className={`${showMenu ? '' : 'hideMenu'} mobileMenu bg-black w-full origin-top hover:shadow-lg transition-all duration-300 absolute z-10 top-15 flex-col gap-3 nav-menu p-4`}>

                <li className="mt-4">
                    <Link onClick={() => setShowMenu(false)} href="/faucet" className="px-2">Claim</Link>
                </li>
                <li className="mt-4">
                    <Link onClick={() => setShowMenu(false)} href="/mint" className="px-2">Mint</Link>
                </li>
                <li className="mt-4">
                    <Link onClick={() => setShowMenu(false)} href="/stake" className="px-2">Stake</Link>
                </li>
                <li className="mt-4">
                    <Link onClick={() => setShowMenu(false)} href="/about" className="px-2">About</Link>
                </li>
                <li className="mt-4">
                    <Balance />
                </li>
                <li
                    onClick={() => setShowMenu(false)}
                    className="mt-4">
                    <ConnectWalletBtn />
                </li>
            </ul>
        </>
    );
}
