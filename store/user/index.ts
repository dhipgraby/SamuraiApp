import { create } from 'zustand'

type State = {
    address: string
    tokenBalance: string
}

const initialState = {
    address: '',
    tokenBalance: '0'
}

type Action = {
    updateAddress: (address: State['address']) => void
    updateBalance: (tokenBalance: State['tokenBalance']) => void
}

export const userStore: any = create<State & Action>((set) => ({
    ...initialState,
    updateAddress: (address) => set(() => ({ address: address })),
    updateBalance: (tokenBalance) => set(() => ({ tokenBalance: tokenBalance })),
    reset: () => {
        set(initialState)
    },
}))