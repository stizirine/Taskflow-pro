'use client'

import { KanbanBoard } from '@/components/kanban'
import { Button } from '@/components/ui/button'
import { DynamicProjectIcon } from '@/components/ui/dynamic-icon'
import { useTaskService } from '@/hooks/use-services'
import { ActionIcons, NavIcons, UIIcons } from '@/lib/icons'
import { useProjectStore, useTaskStore } from '@/stores'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function ProjectDetailPage() {
  const t = useTranslations()
  const params = useParams()
  const projectId = params.projectId as string

  const projects = useProjectStore((state) => state.projects)
  const { setBoard } = useTaskStore()
  const taskService = useTaskService()
  
  const [isLoading, setIsLoading] = useState(true)

  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId]
  )

  const LoaderIcon = UIIcons.loader

  // Charger le board
  useEffect(() => {
    async function loadBoard() {
      setIsLoading(true)
      
      const result = await taskService.getBoardByProjectId(projectId)
      
      if (result.success && result.data) {
        setBoard(result.data)
      }
      
      setIsLoading(false)
    }

    loadBoard()

    return () => {
      setBoard(null)
    }
  }, [projectId, setBoard, taskService])

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <NavIcons.projects className="h-12 w-12 mb-4" />
        <p>{t('errors.notFound')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DynamicProjectIcon
            name={project.icon}
            className="h-8 w-8"
            style={{ color: project.color }}
          />
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-muted-foreground">{project.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ActionIcons.filter className="h-4 w-4 mr-2" />
            {t('common.search')}
          </Button>
          <Button size="sm">
            <ActionIcons.add className="h-4 w-4 mr-2" />
            {t('tasks.newTask')}
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto -mx-4 px-4 md:-mx-6 md:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <KanbanBoard />
        )}
      </div>
    </div>
  )
}