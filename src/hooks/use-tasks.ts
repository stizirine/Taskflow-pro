'use client'

import { useProjectService, useTaskService } from '@/hooks/use-services'
import { TaskStatus, type Project, type Task } from '@/types'
import type { TaskFilters } from '@/types/filters'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<TaskFilters>({})

  const taskService = useTaskService()
  const projectService = useProjectService()

  // Charger tous les projets et leurs tâches
  const loadData = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const projectsResult = await projectService.getAll({ isArchived: false })
      
      if (projectsResult.success && projectsResult.data) {
        setProjects(projectsResult.data)
        
        // Charger les tâches de chaque projet
        const allTasks: Task[] = []
        
        for (const project of projectsResult.data) {
          const boardResult = await taskService.getBoardByProjectId(project.id)
          
          if (boardResult.success && boardResult.data) {
            for (const column of boardResult.data.columns) {
              for (const task of column.tasks) {
                allTasks.push({
                  ...task,
                  // Ajouter le projectId pour le filtrage
                  projectId: project.id,
                  projectName: project.name,
                  projectColor: project.color,
                } as Task & { projectId: string; projectName: string; projectColor: string })
              }
            }
          }
        }
        
        setTasks(allTasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }, [projectService, taskService])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Filtrer les tâches
  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.description?.toLowerCase().includes(search)
      )
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter((t) => t.status === filters.status)
    }

    if (filters.priority && filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority)
    }

    if (filters.projectId && filters.projectId !== 'all') {
      result = result.filter((t) => (t as Task & { projectId?: string }).projectId === filters.projectId)
    }

    if (filters.overdue) {
      const now = new Date()
      result = result.filter(
        (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== TaskStatus.DONE
      )
    }

    return result
  }, [tasks, filters])

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === TaskStatus.DONE).length
    const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length
    const overdue = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.DONE
    ).length

    return { total, completed, inProgress, overdue }
  }, [tasks])

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    projects,
    isLoading,
    filters,
    setFilters,
    stats,
    refresh: loadData,
  }
}