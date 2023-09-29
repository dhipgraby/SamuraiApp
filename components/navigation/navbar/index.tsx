
'use client'

import { ConnectKitButton } from "connectkit";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="http://localhost" target={"_blank"}>
        <p>Last Blood Lines</p>
      </a>
      <ConnectKitButton />
    </nav>
  );
}
