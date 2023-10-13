export function handlePrepareFaucetError(error: any, setter: (isError: boolean) => void) {

    const replacer = (key: string, value: any) => {
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
        }
        return value;
    };

    if (JSON.stringify(error, replacer).includes("insufficient allowance")) {
        setter(true)
        return {
            error: "insufficient allowance",
        }
    }
    return true;
}
