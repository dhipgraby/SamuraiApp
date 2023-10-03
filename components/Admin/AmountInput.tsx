export default function AmountInput({ value, onChange }: { value: string, onChange: (e: any) => void }) {
    return (
        <>            
            <div className="sm:w-full w-1/4">                
                <input
                    min={0}
                    onChange={onChange}
                    value={value}
                    type="number"
                    placeholder="Amount"
                    className="p-1 rounded block my-2 text-black" />
            </div>
        </>
    );
}