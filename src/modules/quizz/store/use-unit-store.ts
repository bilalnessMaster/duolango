import { create } from 'zustand';


interface Store {
  title: string;
  unit: number;
  updateDisplay: (data: { title: string, unit: number }) => void;
}


export const useUnitStore = create<Store>((set) => ({
  title: "",
  unit: 1,
  updateDisplay: (data) => set({ title: data.title, unit: data.unit })
}))
