'use client'

import { ConnectKitButton } from "connectkit";
import styles from "../css/Navbar.module.css";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="http://localhost" target={"_blank"}>
                <img src="./graphic_icon.jpg" className={styles.icon} width={32} />Last Blood Liness
            </a>
            <ConnectKitButton />
        </nav>
    );
}
