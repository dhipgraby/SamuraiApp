import Balance from "@/components/User/Balance";
import TokenInfo from "@/components/Faucet/TokenInfo";
import AdminMint from "@/components/Admin/AdminMint";
import AdminDeposit from "@/components/Admin/AdminDeposit";

export default async function AdminPage() {

    return (
        <div>
            <div className={"text-center"}>
                <h1 className="text-3xl font-bold underline">
                    Admin Functions
                </h1>
            </div>
            <Balance />
            <TokenInfo />
            <AdminMint />

            <AdminDeposit />

        </div>
    )
}
