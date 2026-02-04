'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useTaskService } from '@/hooks/use-services'
import { PriorityIcons, UIIcons } from '@/lib/icons'
import { taskSchema, type TaskFormData } from '@/lib/validations/task'
import { useTaskStore, useUIStore } from '@/stores'
import { ModalType, Priority, type Task } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CreateTaskData {
  columnId: string
}

export function TaskModal() {
  const t = useTranslations()
  const { modal, closeModal } = useUIStore()
  const { addTask, updateTask } = useTaskStore()
  const taskService = useTaskService()

  const LoaderIcon = UIIcons.loader

  const isOpen = modal.isOpen && (modal.type === ModalType.CREATE_TASK || modal.type === ModalType.EDIT_TASK)
  const isEditing = modal.type === ModalType.EDIT_TASK
  const taskToEdit = isEditing ? (modal.data as Task) : null
  const createData = !isEditing ? (modal.data as CreateTaskData) : null

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: Priority.MEDIUM,
      dueDate: '',
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() de react-hook-form utilisé de façon contrôlée
  const watchPriority = watch('priority')

  useEffect(() => {
    if (isOpen && isEditing && taskToEdit) {
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().split('T')[0]
          : '',
      })
    } else if (isOpen && !isEditing) {
      reset({
        title: '',
        description: '',
        priority: Priority.MEDIUM,
        dueDate: '',
      })
    }
  }, [isOpen, isEditing, taskToEdit, reset])

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (isEditing && taskToEdit) {
        const result = await taskService.updateTask(taskToEdit.id, {
          title: data.title,
          description: data.description || undefined,
          priority: data.priority,
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        })

        if (result.success && result.data) {
          updateTask(taskToEdit.id, result.data)
          toast.success(t('tasks.taskUpdated'))
        } else {
          toast.error(result.error || t('errors.somethingWentWrong'))
          return
        }
      } else if (createData?.columnId) {
        const result = await taskService.createTask({
          title: data.title,
          description: data.description || undefined,
          priority: data.priority,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
          columnId: createData.columnId,
        })

        if (result.success && result.data) {
          addTask(createData.columnId, result.data)
          toast.success(t('tasks.taskCreated'))
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

  const priorities = Object.values(Priority)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('tasks.editTask') : t('tasks.newTask')}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? t('common.edit') : t('common.create')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('tasks.taskTitle')}</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder={t('tasks.taskTitle')}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('tasks.taskDescription')}</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder={t('tasks.taskDescription')}
              rows={3}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('tasks.priority')}</Label>
            <Select
              value={watchPriority}
              onValueChange={(value) => setValue('priority', value as Priority)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => {
                  const PriorityIcon = PriorityIcons[priority.toLowerCase() as keyof typeof PriorityIcons]
                  return (
                    <SelectItem key={priority} value={priority}>
                      <div className="flex items-center gap-2">
                        <PriorityIcon className="h-4 w-4" />
                        {t(`tasks.priorities.${priority.toLowerCase()}`)}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">{t('tasks.dueDate')}</Label>
            <Input
              id="dueDate"
              type="date"
              {...register('dueDate')}
              disabled={isSubmitting}
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