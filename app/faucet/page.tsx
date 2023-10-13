import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import Faucet from "@/components/Faucet";

export default async function FaucetPage() {

    const yenIcon = <span className="text-yellow-400"><FontAwesomeIcon icon={faYenSign} /></span>

    return (
        <div>
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    {yenIcon} Claim Free Tokens
                </h1>
                <small>Get free Yen tokens each 24 hours</small>
            </div>
            <Faucet />
        </div>
    )
}
