import { ConnectKitButton } from "connectkit";

type Props = { className?: string | undefined }

export default function ConnectWalletBtn({ className }: Props) {
    return (
        <div className={`${(className !== undefined) ? className : ''} connetWalletBtn`}>
            <ConnectKitButton />
        </div>
    )
}
