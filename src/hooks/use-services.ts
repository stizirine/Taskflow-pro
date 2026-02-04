import { getAuthService, getProjectService, getTaskService } from '@/services/factory'
import { useMemo } from 'react'

export function useAuthService() {
  return useMemo(() => getAuthService(), [])
}

export function useProjectService() {
  return useMemo(() => getProjectService(), [])
}

export function useTaskService() {
  return useMemo(() => getTaskService(), [])
}

// Hook combiné pour tous les services
export function useServices() {
  return useMemo(() => ({
    auth: getAuthService(),
    project: getProjectService(),
    task: getTaskService(),
  }), [])
}