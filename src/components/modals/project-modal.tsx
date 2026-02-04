'use client'

import { ColorPicker } from '@/components/forms/color-picker'
import { IconPicker } from '@/components/forms/icon-picker'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProjectService } from '@/hooks/use-services'
import { UIIcons } from '@/lib/icons'
import { projectSchema, type ProjectFormData } from '@/lib/validations/project'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType, type Project } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function ProjectModal() {
  const t = useTranslations()
  const { modal, closeModal } = useUIStore()
  const { addProject, updateProject } = useProjectStore()
  const projectService = useProjectService()

  const LoaderIcon = UIIcons.loader

  const isOpen = modal.isOpen && (modal.type === ModalType.CREATE_PROJECT || modal.type === ModalType.EDIT_PROJECT)
  const isEditing = modal.type === ModalType.EDIT_PROJECT
  const projectToEdit = modal.data as Project | undefined

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#6366f1',
      icon: 'folder',
    },
  })

  const watchColor = watch('color')
  const watchIcon = watch('icon')

  useEffect(() => {
    if (isOpen && isEditing && projectToEdit) {
      reset({
        name: projectToEdit.name,
        description: projectToEdit.description || '',
        color: projectToEdit.color,
        icon: projectToEdit.icon,
      })
    } else if (isOpen && !isEditing) {
      reset({
        name: '',
        description: '',
        color: '#6366f1',
        icon: 'folder',
      })
    }
  }, [isOpen, isEditing, projectToEdit, reset])

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (isEditing && projectToEdit) {
        const result = await projectService.update(projectToEdit.id, {
          name: data.name,
          description: data.description || undefined,
          color: data.color,
          icon: data.icon,
        })

        if (result.success && result.data) {
          updateProject(projectToEdit.id, result.data)
          toast.success(t('projects.projectUpdated'))
        } else {
          toast.error(result.error || t('errors.somethingWentWrong'))
          return
        }
      } else {
        const result = await projectService.create({
          name: data.name,
          description: data.description || undefined,
          color: data.color,
          icon: data.icon,
        })

        if (result.success && result.data) {
          addProject(result.data)
          toast.success(t('projects.projectCreated'))
        } else {
          toast.error(result.error || t('errors.somethingWentWrong'))
          return
        }
      }

      closeModal()
    } catch {
      toast.error(t('errors.somethingWentWrong'))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('projects.editProject') : t('projects.newProject')}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? t('common.edit') : t('common.create')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('projects.projectName')}</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder={t('projects.projectName')}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('projects.projectDescription')}</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder={t('projects.projectDescription')}
              rows={3}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('projects.projectColor')}</Label>
            <ColorPicker
              value={watchColor}
              onChange={(color) => setValue('color', color)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('projects.icon')}</Label>
            <IconPicker
              value={watchIcon}
              onChange={(icon) => setValue('icon', icon)}
              color={watchColor}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? t('common.save') : t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}