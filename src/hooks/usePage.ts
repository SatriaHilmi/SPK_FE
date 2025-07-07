import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PageState = {
  page: string;
  history: string[];
  setPage: (page: string) => void;
  back: () => void;
};

export const usePage = create<PageState>()(
  persist(
    (set) => ({
      page: 'home',
      history: [],

      setPage: (page) =>
        set((state) => ({
          ...state,
          history: [...state.history, state.page],
          page,
        })),

      back: () =>
        set((state) => {
          const lastPage = state.history.pop() || 'dashboard';
          return { ...state, page: lastPage, history: state.history };
        }),
    }),
    {
      name: 'page-storage',
      storage: {
        getItem: async (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
);
