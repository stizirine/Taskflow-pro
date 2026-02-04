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
import { useTaskService } from '@/hooks/use-services'
import { UIIcons } from '@/lib/icons'
import { useTaskStore, useUIStore } from '@/stores'
import { ModalType, type Task } from '@/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeleteTaskModal() {
  const t = useTranslations()
  const { modal, closeModal } = useUIStore()
  const { deleteTask } = useTaskStore()
  const taskService = useTaskService()
  const [isDeleting, setIsDeleting] = useState(false)

  const LoaderIcon = UIIcons.loader

  const isOpen = modal.isOpen && modal.type === ModalType.DELETE_TASK
  const task = modal.data as Task | undefined

  const handleDelete = async () => {
    if (!task) return

    setIsDeleting(true)
    
    try {
      const result = await taskService.deleteTask(task.id)
      
      if (result.success) {
        deleteTask(task.id)
        toast.success(t('tasks.taskDeleted'))
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
          <AlertDialogTitle>{t('tasks.deleteTask')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('tasks.confirmDelete')}
            <br />
            <strong className="text-foreground">{task?.title}</strong>
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