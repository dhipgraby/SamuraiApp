"use client";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Navbar from "@/components/navigation/navbar";
import { localhost } from "@/contracts/connection"

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
    appIcon: "https://family.co/logo.png",
    chains: [localhost]
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <body>
            <div className={"container mx-auto"}>
              <Navbar />
              <div>{children}</div>
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
