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

export function handlePrepareMintError(error: any, setter: (msg: string) => void) {

    console.log('error asd:',error);
    

    const replacer = (key: string, value: any) => {
        if (typeof value === 'bigint') {
            return value.toString() + 'n';
        }
        return value;
    };

    if (JSON.stringify(error, replacer).includes("TokenExist()")) {
        setter('token exist')
    }
    return true;
}
