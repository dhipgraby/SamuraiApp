//THIS IS NOT IMPORTANT
import { create } from 'zustand'
import { poolsInfo } from '@/data/pools'

type State = {
    poolData: any[]
    isLoading: boolean
}

const initialState = {
    poolData: poolsInfo,
    isLoading: true
}

type Action = {
    updatePools: (poolData: State['poolData']) => void
    updateLoading: (isLoading: State['isLoading']) => void
}

export const stakingStore: any = create<State & Action>((set) => ({
    ...initialState,
    updatePools: (poolData) => set(() => ({ poolData: poolData })),
    updateLoading: (isLoading) => set(() => ({ isLoading: isLoading })),
    reset: () => {
        set(initialState)
    },
}))