
export interface ServerSubmitProps {
    serverAction: () => Promise<any>;
    setIsLoading: (bool: boolean) => void;
    setErrorMsg: (message: string | null) => void;
    nextStep?: () => void;
}

export interface ReviewMutationProps {
    serverAction: () => Promise<any>;
    setIsLoading: (bool: boolean) => void;
    setErrorMsg: (message: string | null) => void;
}

export interface ReviewProps {
    id: number;
    message: string;
    solved: boolean;
    step: number;
}
