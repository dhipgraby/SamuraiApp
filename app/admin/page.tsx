import TokenAbi from "@/contracts/abi/yenAbi.json"
import FaucetAbi from "@/contracts/abi/faucetAbi.json"
import Balance from "@/components/User/Balance";
import TokenInfo from "@/components/Faucet/TokenInfo";
import AdminMint from "@/components/Admin/AdminMint";
import AdminDeposit from "@/components/Admin/AdminDeposit";

type Address = `0x${string}`;

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

export default async function AdminPage() {

    let contracts = await getContracts()

    return (
        <div>
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    Admin Functions
                </h1>
            </div>
            <Balance />
            <TokenInfo
                address={contracts.tokenAddress}
                abi={TokenAbi} />

            <AdminMint
                tokenAddress={contracts.tokenAddress}
                tokenAbi={TokenAbi}
            />

            <AdminDeposit
                faucetAddress={contracts.faucetAddress}
                faucetAbi={FaucetAbi}
                tokenAddress={contracts.tokenAddress}
                tokenAbi={TokenAbi}
            />

        </div>
    )
}
