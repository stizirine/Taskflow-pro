import type { Board, Column, Priority, Task, TaskStatus } from '@/types'
import type { ServiceResponse } from '../types'

export interface CreateTaskData {
  title: string
  description?: string
  priority: Priority
  dueDate?: Date
  columnId: string
  assigneeId?: string
}

export interface UpdateTaskData {
  title?: string
  description?: string
  priority?: Priority
  status?: TaskStatus
  dueDate?: Date | null
  columnId?: string
  position?: number
  assigneeId?: string | null
}

export interface CreateColumnData {
  name: string
  color: string
  boardId: string
}

export interface UpdateColumnData {
  name?: string
  color?: string
  position?: number
}

export interface ITaskService {
  // Board
  getBoardByProjectId(projectId: string): Promise<ServiceResponse<Board | null>>
  
  // Columns
  createColumn(data: CreateColumnData): Promise<ServiceResponse<Column>>
  updateColumn(id: string, data: UpdateColumnData): Promise<ServiceResponse<Column>>
  deleteColumn(id: string): Promise<ServiceResponse<void>>
  reorderColumns(boardId: string, columnIds: string[]): Promise<ServiceResponse<Column[]>>
  
  // Tasks
  getTaskById(id: string): Promise<ServiceResponse<Task | null>>
  createTask(data: CreateTaskData): Promise<ServiceResponse<Task>>
  updateTask(id: string, data: UpdateTaskData): Promise<ServiceResponse<Task>>
  deleteTask(id: string): Promise<ServiceResponse<void>>
  moveTask(taskId: string, toColumnId: string, position: number): Promise<ServiceResponse<Task>>
}