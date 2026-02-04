import { Priority, TaskStatus } from '@/types'

export interface TaskFilters {
  search?: string
  status?: TaskStatus | 'all'
  priority?: Priority | 'all'
  projectId?: string | 'all'
  assigneeId?: string | 'all'
  dueDateFrom?: Date
  dueDateTo?: Date
  overdue?: boolean
}

export type TaskViewMode = 'list' | 'board' | 'calendar'

export interface TaskSortOption {
  field: 'title' | 'priority' | 'dueDate' | 'createdAt' | 'status'
  direction: 'asc' | 'desc'
}