import YenIcon from "../YenIcon";

type ActionProps = {
    isLoading: boolean,
    loadingAllowance: boolean,
    needAllowance: boolean,
    onIncreaseAllowance: () => void, onDeposit: () => void
}

export default function ActionButton({ isLoading, loadingAllowance, needAllowance, onIncreaseAllowance, onDeposit }:
    ActionProps) {

    const handeDeposit = () => {        
        onDeposit()
    }

    return (
        <>
            {needAllowance ?
                <button
                    disabled={loadingAllowance}
                    onClick={onIncreaseAllowance}
                    className={`bg-white text-black p-2 rounded-lg text-lg`}
                >
                    {loadingAllowance ? "APPROVING..." : "SET ALLOWANCE"} <YenIcon />
                </button>
                :
                <button
                    onClick={() => handeDeposit()}
                    className={`bg-white text-black p-2 rounded-lg text-lg`}
                >
                    {isLoading ? "DEPOSITING..." : "DEPOSIT"} <YenIcon />
                </button>
            }
        </>
    );
}