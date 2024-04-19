import { create } from "zustand";

interface OptionsState {
    showOptions: boolean;
    selectedOption: string;
    toggleOptions: () => void;
    handleOptionClick: (option: string) => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
    showOptions: false,
    selectedOption: 'list',
    toggleOptions: () => set((state) => ({ showOptions: !state.showOptions })),
    handleOptionClick: (option) => set({ selectedOption: option, showOptions: false }),
}));