import "./globals.css";
import "./site.css";
import "./animations.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/sonner";
// import { localhost } from "@/contracts/connection"
import Navbar from "@/components/navigation";
import { GlobalProvider } from "@/hooks/GlobalContext";
import Providers from "@/components/Providers";
import { getConfig } from "./config";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html>
      <body>
        <Providers initialState={initialState}>
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
  );
}
