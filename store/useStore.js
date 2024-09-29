import create from 'zustand';

export const useStore = create((set) => ({
  startDate: '',
  endDate: '',
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));
