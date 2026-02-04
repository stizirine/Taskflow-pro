import type { Project } from '@/types'
import { create } from 'zustand'

// ============================================
// TYPES
// ============================================

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  error: string | null
}

interface ProjectActions {
  // CRUD
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, data: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  // Current project
  setCurrentProject: (project: Project | null) => void
  
  // Favorites & Archive
  toggleFavorite: (id: string) => void
  toggleArchive: (id: string) => void
  
  // Loading & Error
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Reset
  reset: () => void
}

type ProjectStore = ProjectState & ProjectActions

// ============================================
// INITIAL STATE
// ============================================

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
}

// ============================================
// STORE
// ============================================

export const useProjectStore = create<ProjectStore>()((set, get) => ({
  // State
  ...initialState,

  // CRUD Actions
  setProjects: (projects) => set({ projects, isLoading: false }),

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),

  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
      ),
      currentProject:
        state.currentProject?.id === id
          ? { ...state.currentProject, ...data, updatedAt: new Date() }
          : state.currentProject,
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject:
        state.currentProject?.id === id ? null : state.currentProject,
    })),

  // Current Project
  setCurrentProject: (project) => set({ currentProject: project }),

  // Favorites & Archive
  toggleFavorite: (id) => {
    const project = get().projects.find((p) => p.id === id)
    if (project) {
      get().updateProject(id, { isFavorite: !project.isFavorite })
    }
  },

  toggleArchive: (id) => {
    const project = get().projects.find((p) => p.id === id)
    if (project) {
      get().updateProject(id, { isArchived: !project.isArchived })
    }
  },

  // Loading & Error
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  // Reset
  reset: () => set(initialState),
}))

// ============================================
// SELECTORS
// ============================================

export const selectProjects = (state: ProjectStore) => state.projects
export const selectCurrentProject = (state: ProjectStore) => state.currentProject
export const selectIsLoading = (state: ProjectStore) => state.isLoading