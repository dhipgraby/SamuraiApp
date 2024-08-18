export interface ServerSubmitProps {
    serverAction: () => Promise<any>;
    setIsLoading: (bool: boolean) => void;
    setErrorMsg: (message: string | null) => void;
    nextStep?: () => void;
}