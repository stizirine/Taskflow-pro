'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useProjectService } from '@/hooks/use-services'
import { UIIcons } from '@/lib/icons'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType, type Project } from '@/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeleteProjectModal() {
  const t = useTranslations()
  const { modal, closeModal } = useUIStore()
  const { deleteProject } = useProjectStore()
  const projectService = useProjectService()
  const [isDeleting, setIsDeleting] = useState(false)

  const LoaderIcon = UIIcons.loader

  const isOpen = modal.isOpen && modal.type === ModalType.DELETE_PROJECT
  const project = modal.data as Project | undefined

  const handleDelete = async () => {
    if (!project) return

    setIsDeleting(true)
    
    try {
      const result = await projectService.delete(project.id)
      
      if (result.success) {
        deleteProject(project.id)
        toast.success(t('projects.projectDeleted'))
        closeModal()
      } else {
        toast.error(result.error || t('errors.somethingWentWrong'))
      }
    } catch {
      toast.error(t('errors.somethingWentWrong'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('projects.deleteProject')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('projects.confirmDelete')}
            <br />
            <strong className="text-foreground">{project?.name}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('common.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {t('common.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}