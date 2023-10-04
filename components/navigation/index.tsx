'use client'
import { useState } from "react"
import { ConnectKitButton } from "connectkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <nav className='dark-theme relative flex items-center min-w-screen'>
                <ul className='bg-black flex p-3 w-full items-center justify-between sm:hidden'>
                    <li onClick={() => setShowMenu(prev => !prev)} className='w-full pt-1 ml-3 cursor-pointer'>
                        <span className="menu material-symbols-outlined">
                            <FontAwesomeIcon icon={(showMenu) ? faClose : faBars} />
                        </span>
                    </li>
                    <li className='w-1/6 pt-1 text-right'>
                        <span className="logo material-symbols-outlined">
                            <img src="./graphic_icon.jpg" className={"icon"} width={32} />
                        </span>
                    </li>
                </ul>

                <ul className='hidden p-4 w-full h-20 gap-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 items-center justify-between sm:flex'>
                    <li className='flex gap-8 justify-between items-center'>
                        <Link href="/">
                            <span className='items-center flex gap-2 flex'>
                                <span className="logo material-symbols-outlined">
                                    <img src="./graphic_icon.jpg" className={"icon rounded-full	"} width={32} />
                                </span>
                                <span className="hidden md:flex">
                                    Last Bloodlines
                                </span>
                            </span>
                        </Link>
                        <Link href="/admin" className="px-4 py-2">Admin</Link>
                        <Link href="/faucet" className="px-4 py-2">Claim</Link>
                        <Link href="/mint" className="px-4 py-2">Mint</Link>
                        <Link href="/stake" className="px-4 py-2">Stake</Link>
                        <Link href="/about" className="px-4 py-2">About</Link>
                    </li>
                    <li className='flex gap-1 w-fit justify-end'>
                        <ConnectKitButton />
                    </li>
                </ul>
            </nav>

            {/* Conditionally render dropdown based on showMenu state */}
            <ul className={`bg-black w-full origin-top hover:shadow-lg transition-all duration-300 absolute z-10 top-12 flex-col gap-3 nav-menu ${showMenu ? '' : 'hidden'} p-4`}>

                <li className='w-full'>
                    <Link onClick={() => setShowMenu(false)} href="/admin" className="w-full px-2">Admin</Link>
                </li>
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
                <li
                    onClick={() => setShowMenu(false)}
                    className="mt-4">
                    <ConnectKitButton />
                </li>
            </ul>
        </>
    );
}
