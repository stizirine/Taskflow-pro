import type { Project } from '@/types'
import { MOCK_DELAY } from '../config'
import type { CreateProjectData, IProjectService, ProjectFilters, UpdateProjectData } from '../interfaces'
import type { PaginatedResponse, ServiceResponse } from '../types'
import { mockDb } from './data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class ProjectMockService implements IProjectService {
  async getAll(filters?: ProjectFilters): Promise<ServiceResponse<Project[]>> {
    await delay(MOCK_DELAY)
    
    let projects = mockDb.getProjects()
    
    if (filters) {
      if (filters.search) {
        const search = filters.search.toLowerCase()
        projects = projects.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
        )
      }
      if (filters.isFavorite !== undefined) {
        projects = projects.filter(p => p.isFavorite === filters.isFavorite)
      }
      if (filters.isArchived !== undefined) {
        projects = projects.filter(p => p.isArchived === filters.isArchived)
      }
    }
    
    return {
      success: true,
      data: projects,
    }
  }

  async getPaginated(
    page: number, 
    pageSize: number, 
    filters?: ProjectFilters
  ): Promise<ServiceResponse<PaginatedResponse<Project>>> {
    await delay(MOCK_DELAY)
    
    const allResult = await this.getAll(filters)
    const allProjects = allResult.data || []
    
    const total = allProjects.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const items = allProjects.slice(start, start + pageSize)
    
    return {
      success: true,
      data: {
        items,
        total,
        page,
        pageSize,
        totalPages,
      },
    }
  }

  async getById(id: string): Promise<ServiceResponse<Project | null>> {
    await delay(MOCK_DELAY / 2)
    
    const project = mockDb.getProjectById(id)
    
    return {
      success: true,
      data: project || null,
    }
  }

  async create(data: CreateProjectData): Promise<ServiceResponse<Project>> {
    await delay(MOCK_DELAY)
    
    const currentUser = mockDb.getCurrentUser()
    
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: data.name,
      description: data.description || null,
      color: data.color,
      icon: data.icon,
      isFavorite: false,
      isArchived: false,
      ownerId: currentUser?.id || 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    mockDb.addProject(newProject)
    
    return {
      success: true,
      data: newProject,
    }
  }

  async update(id: string, data: UpdateProjectData): Promise<ServiceResponse<Project>> {
    await delay(MOCK_DELAY)
    
    const updatedProject = mockDb.updateProject(id, data)
    
    if (!updatedProject) {
      return {
        success: false,
        error: 'Projet non trouvé',
      }
    }
    
    return {
      success: true,
      data: updatedProject,
    }
  }

  async delete(id: string): Promise<ServiceResponse<void>> {
    await delay(MOCK_DELAY)
    
    const deleted = mockDb.deleteProject(id)
    
    if (!deleted) {
      return {
        success: false,
        error: 'Projet non trouvé',
      }
    }
    
    return {
      success: true,
    }
  }

  async toggleFavorite(id: string): Promise<ServiceResponse<Project>> {
    await delay(MOCK_DELAY / 2)
    
    const project = mockDb.getProjectById(id)
    
    if (!project) {
      return {
        success: false,
        error: 'Projet non trouvé',
      }
    }
    
    return this.update(id, { isFavorite: !project.isFavorite })
  }

  async toggleArchive(id: string): Promise<ServiceResponse<Project>> {
    await delay(MOCK_DELAY / 2)
    
    const project = mockDb.getProjectById(id)
    
    if (!project) {
      return {
        success: false,
        error: 'Projet non trouvé',
      }
    }
    
    return this.update(id, { isArchived: !project.isArchived })
  }
}