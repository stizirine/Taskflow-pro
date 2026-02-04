import type { Project } from '@/types'
import type { CreateProjectData, IProjectService, ProjectFilters, UpdateProjectData } from '../interfaces'
import type { PaginatedResponse, ServiceResponse } from '../types'

export class ProjectApiService implements IProjectService {
  private baseUrl = '/api/projects'

  async getAll(filters?: ProjectFilters): Promise<ServiceResponse<Project[]>> {
    const params = new URLSearchParams()
    if (filters?.search) params.set('search', filters.search)
    if (filters?.isFavorite !== undefined) params.set('isFavorite', String(filters.isFavorite))
    if (filters?.isArchived !== undefined) params.set('isArchived', String(filters.isArchived))
    
    const response = await fetch(`${this.baseUrl}?${params}`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.projects }
  }

  async getPaginated(
    page: number, 
    pageSize: number, 
    filters?: ProjectFilters
  ): Promise<ServiceResponse<PaginatedResponse<Project>>> {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    })
    if (filters?.search) params.set('search', filters.search)
    if (filters?.isFavorite !== undefined) params.set('isFavorite', String(filters.isFavorite))
    if (filters?.isArchived !== undefined) params.set('isArchived', String(filters.isArchived))
    
    const response = await fetch(`${this.baseUrl}?${params}`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result }
  }

  async getById(id: string): Promise<ServiceResponse<Project | null>> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.project }
  }

  async create(data: CreateProjectData): Promise<ServiceResponse<Project>> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.project }
  }

  async update(id: string, data: UpdateProjectData): Promise<ServiceResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.project }
  }

  async delete(id: string): Promise<ServiceResponse<void>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const result = await response.json()
      return { success: false, error: result.error }
    }
    
    return { success: true }
  }

  async toggleFavorite(id: string): Promise<ServiceResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}/favorite`, {
      method: 'POST',
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.project }
  }

  async toggleArchive(id: string): Promise<ServiceResponse<Project>> {
    const response = await fetch(`${this.baseUrl}/${id}/archive`, {
      method: 'POST',
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.project }
  }
}