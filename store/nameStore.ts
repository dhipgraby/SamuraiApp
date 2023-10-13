import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
    firstName: string;
    lastName: string;
    updateFirstName: (firstName: string) => void;
}

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State>()(
    (set) => ({
        firstName: '',
        lastName: '',
        updateFirstName: (firstName: string) => set(() => ({ firstName: firstName })),
    })
)