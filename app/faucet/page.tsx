import TokenAbi from "@/contracts/abi/yenAbi.json"
import FaucetAbi from "@/contracts/abi/faucetAbi.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";
import Faucet from "@/components/Faucet";
import { Address } from "@/dto/tokenDto";

interface FaucetProps {
    faucetAddress: Address | undefined;
    tokenAddress: Address | undefined;
}

async function getContracts(): Promise<FaucetProps> {
    const faucetAddress = process.env.FAUCET_ADDRESS as Address | undefined;
    const tokenAddress = process.env.YENTOKEN_ADDRESS as Address | undefined;

    return {
        faucetAddress: faucetAddress,
        tokenAddress: tokenAddress
    }
}

export default async function FaucetPage() {

    const yenIcon = <span className="text-yellow-400"><FontAwesomeIcon icon={faYenSign} /></span>
    let contracts = await getContracts()

    return (
        <div>            
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    {yenIcon} Claim Free Tokens
                </h1>
                <small>Get free Yen tokens each 24 hours</small>
            </div>
            <Faucet
                faucetAddress={contracts.faucetAddress}
                tokenAddress={contracts.tokenAddress}
                faucetAbi={FaucetAbi}
                tokenAbi={TokenAbi}
            />
        </div>
    )
}
