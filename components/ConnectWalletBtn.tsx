import { ConnectButton } from "@rainbow-me/rainbowkit";

type Props = { className?: string | undefined };

export default function ConnectWalletBtn({ className }: Props) {
  return (
    <div
      className={`${className !== undefined ? className : ""} connetWalletBtn`}
    >
      <ConnectButton />
    </div>
  );
}
