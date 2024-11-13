"use client";
import "./globals.css";
import "./site.css";
import "./animations.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Toaster } from "@/components/ui/sonner";
// import { localhost } from "@/contracts/connection"
import Navbar from "@/components/navigation";
import { GlobalProvider } from "@/hooks/GlobalContext";
import { sepolia } from "wagmi/chains";
import Providers from "@/components/Providers";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_API_KEY,
    walletConnectProjectId: "32cae9a2ad83b78226dd813e5ce6ad4a",
    appName: "SamaraiApp",
    appDescription: "Last Bloodlines DApp",
    appUrl: "https://lastbloodlines.com/",
    appIcon: "../public/masklogo.jpg",
    chains: [sepolia],
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <html>
          <body>
            <Providers>
              <GlobalProvider>
                <Toaster
                  position="top-right"
                  richColors
                  closeButton
                  style={{ marginTop: "2.5rem" }}
                  visibleToasts={9}
                  toastOptions={{
                    duration: 10000,
                  }}
                />
                <Navbar />
                <div className={"container mx-auto pt-8 px-4 pb-5"}>
                  <div>{children}</div>
                </div>
              </GlobalProvider>
            </Providers>
          </body>
        </html>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
