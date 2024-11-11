// import { create } from 'zustand';

// type State = {
//     address: string;
//     ethBalance: string;
//     tokenBalance: string;
// };

// const initialState: State = {
//     address: '',
//     ethBalance: '0',
//     tokenBalance: '0',
// };

// type Actions = {
//     updateAddress: (address: string) => void;
//     updateBalance: (tokenBalance: string) => void;
//     updateEthBalance: (ethBalance: string) => void;
//     reset: () => void;
// };

// export const userStore = create<State & Actions>((set) => ({
//     ...initialState,
//     updateAddress: (address) => set({ address }),
//     updateBalance: (tokenBalance) => set({ tokenBalance }),
//     updateEthBalance: (ethBalance) => set({ ethBalance }),
//     reset: () => set(initialState),
// }));

// export type UserStoreType = State & Actions;