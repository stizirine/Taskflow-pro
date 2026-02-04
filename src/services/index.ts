// Config
export { isApiMode, isMockMode, MOCK_DELAY, SERVICE_MODE } from './config'

// Types
export type { AuthCredentials, PaginatedResponse, RegisterData, ServiceResponse } from './types'

// Interfaces
export type {
  CreateProjectData, CreateTaskData, IAuthService,
  IProjectService,
  ITaskService, ProjectFilters, UpdateProjectData, UpdateTaskData
} from './interfaces'

// Factory
export { getAuthService, getProjectService, getTaskService, resetServices } from './factory'
