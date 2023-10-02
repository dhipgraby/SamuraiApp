'use client'

import { ConnectKitButton } from "connectkit";
import styles from "../css/Navbar.module.css";
import Link from "next/link";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <img src="./graphic_icon.jpg" className={styles.icon} width={32} />Last Bloodlines
            </Link>
            <Link href="/faucet">
                Claim
            </Link>
            <Link href="/mint">
                Mint
            </Link>
            <Link href="/mint">
                About
            </Link>

            <ConnectKitButton />
        </nav>
    );
}
