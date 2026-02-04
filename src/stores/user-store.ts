import type { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================
// TYPES
// ============================================

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface UserActions {
  setUser: (user: User | null) => void
  updateUser: (data: Partial<User>) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

type UserStore = UserState & UserActions

// ============================================
// INITIAL STATE
// ============================================

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

// ============================================
// STORE
// ============================================

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // State
      ...initialState,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => set(initialState),
    }),
    {
      name: 'taskflow-user', // clé localStorage
      partialize: (state) => ({ user: state.user }), // persiste seulement user
    }
  )
)

// ============================================
// SELECTORS (optionnel mais pratique)
// ============================================

export const selectUser = (state: UserStore) => state.user
export const selectIsAuthenticated = (state: UserStore) => state.isAuthenticated
export const selectIsLoading = (state: UserStore) => state.isLoading