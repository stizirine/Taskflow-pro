import type { Board, Column, Task } from '@/types'
import type { CreateColumnData, CreateTaskData, ITaskService, UpdateColumnData, UpdateTaskData } from '../interfaces'
import type { ServiceResponse } from '../types'

export class TaskApiService implements ITaskService {
  async getBoardByProjectId(projectId: string): Promise<ServiceResponse<Board | null>> {
    const response = await fetch(`/api/projects/${projectId}/board`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.board }
  }

  async createColumn(data: CreateColumnData): Promise<ServiceResponse<Column>> {
    const response = await fetch('/api/columns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.column }
  }

  async updateColumn(id: string, data: UpdateColumnData): Promise<ServiceResponse<Column>> {
    const response = await fetch(`/api/columns/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.column }
  }

  async deleteColumn(id: string): Promise<ServiceResponse<void>> {
    const response = await fetch(`/api/columns/${id}`, { method: 'DELETE' })
    
    if (!response.ok) {
      const result = await response.json()
      return { success: false, error: result.error }
    }
    
    return { success: true }
  }

  async reorderColumns(boardId: string, columnIds: string[]): Promise<ServiceResponse<Column[]>> {
    const response = await fetch(`/api/boards/${boardId}/reorder-columns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columnIds }),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.columns }
  }

  async getTaskById(id: string): Promise<ServiceResponse<Task | null>> {
    const response = await fetch(`/api/tasks/${id}`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.task }
  }

  async createTask(data: CreateTaskData): Promise<ServiceResponse<Task>> {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.task }
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<ServiceResponse<Task>> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.task }
  }

  async deleteTask(id: string): Promise<ServiceResponse<void>> {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    
    if (!response.ok) {
      const result = await response.json()
      return { success: false, error: result.error }
    }
    
    return { success: true }
  }

  async moveTask(taskId: string, toColumnId: string, position: number): Promise<ServiceResponse<Task>> {
    const response = await fetch(`/api/tasks/${taskId}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toColumnId, position }),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.task }
  }
}