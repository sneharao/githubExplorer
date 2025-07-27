import { create } from 'zustand';
import { Repository } from '../models/repository';


export const useRepoStore = create((set) => ({
    selectedRepo: null,
    setSelectedRepo: (repo: Repository) => set({ selectedRepo: repo }),
    clearSelectedRepo: () => set({ selectedRepo: null }),
}))