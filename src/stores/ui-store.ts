import { ModalType, Theme, type ModalState } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================
// TYPES
// ============================================

interface UIState {
  theme: Theme
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  modal: ModalState
}

interface UIActions {
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapsed: () => void
  openModal: (type: ModalType, data?: unknown) => void
  closeModal: () => void
}

type UIStore = UIState & UIActions

// ============================================
// INITIAL STATE
// ============================================

const initialState: UIState = {
  theme: Theme.SYSTEM,
  sidebarOpen: true,
  sidebarCollapsed: false,
  modal: {
    isOpen: false,
    type: null,
    data: undefined,
  },
}

// ============================================
// STORE
// ============================================

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      ...initialState,

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      openModal: (type, data) =>
        set({
          modal: { isOpen: true, type, data },
        }),

      closeModal: () =>
        set({
          modal: { isOpen: false, type: null, data: undefined },
        }),
    }),
    {
      name: 'taskflow-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)

// ============================================
// SELECTORS
// ============================================

export const selectTheme = (state: UIStore) => state.theme
export const selectSidebarOpen = (state: UIStore) => state.sidebarOpen
export const selectSidebarCollapsed = (state: UIStore) => state.sidebarCollapsed
export const selectModal = (state: UIStore) => state.modal