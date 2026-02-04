'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DynamicProjectIcon } from '@/components/ui/dynamic-icon'
import { useProjectService } from '@/hooks/use-services'
import { ActionIcons } from '@/lib/icons'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType, type Project } from '@/types'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations()
  const { updateProject } = useProjectStore()
  const { openModal } = useUIStore()
  const projectService = useProjectService()

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const result = await projectService.toggleFavorite(project.id)
    
    if (result.success && result.data) {
      updateProject(project.id, result.data)
      toast.success(
        result.data.isFavorite 
          ? t('projects.addedToFavorites') 
          : t('projects.removedFromFavorites')
      )
    } else {
      toast.error(result.error || t('errors.somethingWentWrong'))
    }
  }

  const handleToggleArchive = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const result = await projectService.toggleArchive(project.id)
    
    if (result.success && result.data) {
      updateProject(project.id, result.data)
      toast.success(
        result.data.isArchived 
          ? t('projects.archived') 
          : t('projects.unarchived')
      )
    } else {
      toast.error(result.error || t('errors.somethingWentWrong'))
    }
  }

  const handleOpenEditModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openModal(ModalType.EDIT_PROJECT, project)
  }

  const handleOpenDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openModal(ModalType.DELETE_PROJECT, project)
  }

  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: project.color }}
      />

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <DynamicProjectIcon
              name={project.icon}
              className="h-6 w-6"
              style={{ color: project.color }}
            />
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.preventDefault()}
              >
                <ActionIcons.moreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleOpenEditModal}>
                <ActionIcons.edit className="mr-2 h-4 w-4" />
                {t('common.edit')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleFavorite}>
                <ActionIcons.favorite
                  className={`mr-2 h-4 w-4 ${project.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
                />
                {project.isFavorite ? t('projects.removeFromFavorites') : t('projects.addToFavorites')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleArchive}>
                <ActionIcons.archive className="mr-2 h-4 w-4" />
                {project.isArchived ? t('projects.unarchive') : t('projects.archive')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleOpenDeleteModal}
                className="text-destructive"
              >
                <ActionIcons.delete className="mr-2 h-4 w-4" />
                {t('common.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description || t('projects.noDescription')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          {project.isFavorite && (
            <Badge variant="secondary">
              <ActionIcons.favorite className="h-3 w-3 mr-1 fill-current" />
              {t('projects.favorite')}
            </Badge>
          )}
          {project.isArchived && (
            <Badge variant="outline">
              <ActionIcons.archive className="h-3 w-3 mr-1" />
              {t('projects.archived')}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}