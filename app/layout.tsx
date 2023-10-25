"use client";
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ToastContainer } from 'react-toastify';
import { localhost } from "@/contracts/connection"
import Navbar from "@/components/navigation";
import { GlobalProvider } from '@/hooks/GlobalContext';
import { goerli } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_API_KEY,
    walletConnectProjectId: "32cae9a2ad83b78226dd813e5ce6ad4a",
    appName: "SamaraiApp",
    appDescription: "Last Bloodlines DApp",
    appUrl: "https://lastbloodlines.com/",
    appIcon: "../public/masklogo.jpg",
    chains: [goerli]
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>

        <html>
          <body>
            <GlobalProvider>
              <ToastContainer />
              <Navbar />
              <div className={"container mx-auto pt-8 px-4 pb-5"}>
                <div>{children}</div>
              </div>
            </GlobalProvider>
          </body>
        </html>

      </ConnectKitProvider>
    </WagmiConfig>
  )
}
