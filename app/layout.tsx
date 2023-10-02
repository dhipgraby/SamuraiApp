"use client";
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { localhost } from "@/contracts/connection"
import Head from 'next/head';

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "32cae9a2ad83b78226dd813e5ce6ad4a",
    // Required
    appName: "SamaraiApp",
    // Optional
    appDescription: "Last blood lines DApp",
    appUrl: "https://lastbloodlines.com/",
    appIcon: "../public/graphic_icon.jpg",
    chains: [localhost]
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="../public/graphic_icon.jpg" />
      </Head>
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <body>
            <div className={"container mx-auto px-4 pb-5"}>
              <div>{children}</div>
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  )
}
