import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface DashboardPageState {
  page: string
  history: string[]
  setPage: (page: string) => void;
  back: () => void;
}

export const useDashboardPage = create<DashboardPageState>()(
  persist(
    (set) => ({
      page: 'dashboard',
      history: [],
      setPage: (page) => set({ page }),
      back: () =>
        set((state) => {
          const lastPage = state.history.pop() || 'dashboard';
          return { ...state, page: lastPage, history: state.history };
        }),
    }),
    {
      name: 'dashboard-page-storage',
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
)