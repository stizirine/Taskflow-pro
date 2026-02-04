import type { Project } from '@/types'
import type { PaginatedResponse, ServiceResponse } from '../types'

export interface CreateProjectData {
  name: string
  description?: string
  color: string
  icon: string
}

export interface UpdateProjectData {
  name?: string
  description?: string
  color?: string
  icon?: string
  isFavorite?: boolean
  isArchived?: boolean
}

export interface ProjectFilters {
  search?: string
  isFavorite?: boolean
  isArchived?: boolean
}

export interface IProjectService {
  getAll(filters?: ProjectFilters): Promise<ServiceResponse<Project[]>>
  getPaginated(page: number, pageSize: number, filters?: ProjectFilters): Promise<ServiceResponse<PaginatedResponse<Project>>>
  getById(id: string): Promise<ServiceResponse<Project | null>>
  create(data: CreateProjectData): Promise<ServiceResponse<Project>>
  update(id: string, data: UpdateProjectData): Promise<ServiceResponse<Project>>
  delete(id: string): Promise<ServiceResponse<void>>
  toggleFavorite(id: string): Promise<ServiceResponse<Project>>
  toggleArchive(id: string): Promise<ServiceResponse<Project>>
}