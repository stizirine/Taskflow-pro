import type { Board, Column, Task } from '@/types'
import { TaskStatus } from '@/types'
import { MOCK_DELAY } from '../config'
import type { CreateColumnData, CreateTaskData, ITaskService, UpdateColumnData, UpdateTaskData } from '../interfaces'
import type { ServiceResponse } from '../types'
import { mockDb } from './data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class TaskMockService implements ITaskService {
  // Board
  async getBoardByProjectId(projectId: string): Promise<ServiceResponse<Board | null>> {
    await delay(MOCK_DELAY)
    
    const board = mockDb.getBoard(projectId)
    
    return {
      success: true,
      data: board,
    }
  }

  // Columns
  async createColumn(data: CreateColumnData): Promise<ServiceResponse<Column>> {
    await delay(MOCK_DELAY)
    
    const board = mockDb.getBoard(data.boardId.replace('-board', ''))
    
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      name: data.name,
      color: data.color,
      position: board.columns.length,
      boardId: data.boardId,
      tasks: [],
    }
    
    board.columns.push(newColumn)
    mockDb.updateBoard(data.boardId.replace('-board', ''), board)
    
    return {
      success: true,
      data: newColumn,
    }
  }

  async updateColumn(id: string, data: UpdateColumnData): Promise<ServiceResponse<Column>> {
    await delay(MOCK_DELAY)
    
    // Trouver la colonne dans tous les boards
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      const columnIndex = board.columns.findIndex(c => c.id === id)
      
      if (columnIndex !== -1) {
        board.columns[columnIndex] = { ...board.columns[columnIndex], ...data }
        mockDb.updateBoard(projectId, board)
        
        return {
          success: true,
          data: board.columns[columnIndex],
        }
      }
    }
    
    return {
      success: false,
      error: 'Colonne non trouvée',
    }
  }

  async deleteColumn(id: string): Promise<ServiceResponse<void>> {
    await delay(MOCK_DELAY)
    
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      const columnIndex = board.columns.findIndex(c => c.id === id)
      
      if (columnIndex !== -1) {
        board.columns.splice(columnIndex, 1)
        mockDb.updateBoard(projectId, board)
        
        return {
          success: true,
        }
      }
    }
    
    return {
      success: false,
      error: 'Colonne non trouvée',
    }
  }

  async reorderColumns(boardId: string, columnIds: string[]): Promise<ServiceResponse<Column[]>> {
    await delay(MOCK_DELAY)
    
    const projectId = boardId.replace('-board', '')
    const board = mockDb.getBoard(projectId)
    
    const reorderedColumns = columnIds.map((id, index) => {
      const column = board.columns.find(c => c.id === id)!
      return { ...column, position: index }
    })
    
    board.columns = reorderedColumns
    mockDb.updateBoard(projectId, board)
    
    return {
      success: true,
      data: reorderedColumns,
    }
  }

  // Tasks
  async getTaskById(id: string): Promise<ServiceResponse<Task | null>> {
    await delay(MOCK_DELAY / 2)
    
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      
      for (const column of board.columns) {
        const task = column.tasks.find(t => t.id === id)
        if (task) {
          return {
            success: true,
            data: task,
          }
        }
      }
    }
    
    return {
      success: true,
      data: null,
    }
  }

  async createTask(data: CreateTaskData): Promise<ServiceResponse<Task>> {
    await delay(MOCK_DELAY)
    
    // Trouver la colonne
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      const column = board.columns.find(c => c.id === data.columnId)
      
      if (column) {
        const newTask: Task = {
          id: `task-${Date.now()}`,
          title: data.title,
          description: data.description || null,
          position: column.tasks.length,
          priority: data.priority,
          status: TaskStatus.TODO,
          dueDate: data.dueDate || null,
          columnId: data.columnId,
          assigneeId: data.assigneeId || null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        column.tasks.push(newTask)
        mockDb.updateBoard(projectId, board)
        
        return {
          success: true,
          data: newTask,
        }
      }
    }
    
    return {
      success: false,
      error: 'Colonne non trouvée',
    }
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<ServiceResponse<Task>> {
    await delay(MOCK_DELAY)
    
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === id)
        
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            ...data,
            updatedAt: new Date(),
          }
          mockDb.updateBoard(projectId, board)
          
          return {
            success: true,
            data: column.tasks[taskIndex],
          }
        }
      }
    }
    
    return {
      success: false,
      error: 'Tâche non trouvée',
    }
  }

  async deleteTask(id: string): Promise<ServiceResponse<void>> {
    await delay(MOCK_DELAY)
    
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === id)
        
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1)
          mockDb.updateBoard(projectId, board)
          
          return {
            success: true,
          }
        }
      }
    }
    
    return {
      success: false,
      error: 'Tâche non trouvée',
    }
  }

  async moveTask(taskId: string, toColumnId: string, position: number): Promise<ServiceResponse<Task>> {
    await delay(MOCK_DELAY / 2)
    
    for (const projectId of ['project-1', 'project-2', 'project-3']) {
      const board = mockDb.getBoard(projectId)
      
      // Trouver et retirer la tâche de sa colonne actuelle
      let task: Task | null = null
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          task = column.tasks.splice(taskIndex, 1)[0]
          break
        }
      }
      
      if (task) {
        // Ajouter à la nouvelle colonne
        const targetColumn = board.columns.find(c => c.id === toColumnId)
        if (targetColumn) {
          task.columnId = toColumnId
          task.position = position
          task.updatedAt = new Date()
          
          targetColumn.tasks.splice(position, 0, task)
          
          // Réindexer les positions
          targetColumn.tasks.forEach((t, idx) => {
            t.position = idx
          })
          
          mockDb.updateBoard(projectId, board)
          
          return {
            success: true,
            data: task,
          }
        }
      }
    }
    
    return {
      success: false,
      error: 'Tâche non trouvée',
    }
  }
}