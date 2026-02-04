import { type Board, type Column, type Task } from '@/types'
import { create } from 'zustand'

// ============================================
// TYPES
// ============================================

interface TaskState {
  board: Board | null
  selectedTask: Task | null
  isLoading: boolean
  error: string | null
}

interface TaskActions {
  setBoard: (board: Board | null) => void
  addColumn: (column: Column) => void
  updateColumn: (columnId: string, data: Partial<Column>) => void
  deleteColumn: (columnId: string) => void
  reorderColumns: (columns: Column[]) => void
  addTask: (columnId: string, task: Task) => void
  updateTask: (taskId: string, data: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string, newPosition: number) => void
  setSelectedTask: (task: Task | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

type TaskStore = TaskState & TaskActions

// ============================================
// INITIAL STATE
// ============================================

const initialState: TaskState = {
  board: null,
  selectedTask: null,
  isLoading: false,
  error: null,
}

// ============================================
// STORE
// ============================================

export const useTaskStore = create<TaskStore>()((set) => ({
  ...initialState,

  setBoard: (board) => set({ board, isLoading: false }),

  addColumn: (column) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: [...state.board.columns, column],
        },
      }
    }),

  updateColumn: (columnId, data) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) =>
            col.id === columnId ? { ...col, ...data } : col
          ),
        },
      }
    }),

  deleteColumn: (columnId) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: state.board.columns.filter((col) => col.id !== columnId),
        },
      }
    }),

  reorderColumns: (columns) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: { ...state.board, columns },
      }
    }),

  addTask: (columnId, task) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) =>
            col.id === columnId
              ? { ...col, tasks: [...col.tasks, task] }
              : col
          ),
        },
      }
    }),

  updateTask: (taskId, data) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, ...data } : task
            ),
          })),
        },
        selectedTask:
          state.selectedTask?.id === taskId
            ? { ...state.selectedTask, ...data }
            : state.selectedTask,
      }
    }),

  deleteTask: (taskId) =>
    set((state) => {
      if (!state.board) return state
      return {
        board: {
          ...state.board,
          columns: state.board.columns.map((col) => ({
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          })),
        },
        selectedTask:
          state.selectedTask?.id === taskId ? null : state.selectedTask,
      }
    }),

  moveTask: (taskId, fromColumnId, toColumnId, newPosition) =>
    set((state) => {
      if (!state.board) return state

      const fromColumn = state.board.columns.find((c) => c.id === fromColumnId)
      const task = fromColumn?.tasks.find((t) => t.id === taskId)
      if (!task) return state

      const columnsWithoutTask = state.board.columns.map((col) =>
        col.id === fromColumnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )

      const updatedTask = { ...task, columnId: toColumnId, position: newPosition }
      const finalColumns = columnsWithoutTask.map((col) => {
        if (col.id === toColumnId) {
          const newTasks = [...col.tasks]
          newTasks.splice(newPosition, 0, updatedTask)
          return {
            ...col,
            tasks: newTasks.map((t, idx) => ({ ...t, position: idx })),
          }
        }
        return col
      })

      return {
        board: { ...state.board, columns: finalColumns },
      }
    }),

  setSelectedTask: (task) => set({ selectedTask: task }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  reset: () => set(initialState),
}))

// ============================================
// SELECTORS
// ============================================

export const selectBoard = (state: TaskStore) => state.board
export const selectColumns = (state: TaskStore) => state.board?.columns ?? []
export const selectSelectedTask = (state: TaskStore) => state.selectedTask
export const selectTaskById = (taskId: string) => (state: TaskStore) => {
  for (const column of state.board?.columns ?? []) {
    const task = column.tasks.find((t) => t.id === taskId)
    if (task) return task
  }
  return null
}