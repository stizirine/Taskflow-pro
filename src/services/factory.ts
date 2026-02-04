import { AuthApiService, ProjectApiService, TaskApiService } from './api'
import { isMockMode } from './config'
import type { IAuthService, IProjectService, ITaskService } from './interfaces'
import { AuthMockService, ProjectMockService, TaskMockService } from './mock'

// Singleton instances
let authService: IAuthService | null = null
let projectService: IProjectService | null = null
let taskService: ITaskService | null = null

export function getAuthService(): IAuthService {
  if (!authService) {
    authService = isMockMode ? new AuthMockService() : new AuthApiService()
  }
  return authService
}

export function getProjectService(): IProjectService {
  if (!projectService) {
    projectService = isMockMode ? new ProjectMockService() : new ProjectApiService()
  }
  return projectService
}

export function getTaskService(): ITaskService {
  if (!taskService) {
    taskService = isMockMode ? new TaskMockService() : new TaskApiService()
  }
  return taskService
}

// Pour les tests - réinitialiser les services
export function resetServices() {
  authService = null
  projectService = null
  taskService = null
}