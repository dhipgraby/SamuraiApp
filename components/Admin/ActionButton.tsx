import YenIcon from "../YenIcon";

export default function ActionButton({ isLoading, needAllowance, onIncreaseAllowance, onDeposit }: { isLoading: boolean, needAllowance: boolean, onIncreaseAllowance: () => void, onDeposit: () => void }) {
    return (
        <>
            {needAllowance ?
                <button
                    disabled={isLoading}
                    onClick={onIncreaseAllowance}
                    className={`bg-white text-black p-2 rounded-lg text-lg`}
                >
                    {isLoading ? "APPROVING..." : "SET ALLOWANCE"} <YenIcon />
                </button>
                :
                <button
                    disabled={isLoading}
                    onClick={onDeposit}
                    className={`bg-white text-black p-2 rounded-lg text-lg`}
                >
                    {isLoading ? "DEPOSITING..." : "DEPOSIT"} <YenIcon />
                </button>
            }
        </>
    );
}