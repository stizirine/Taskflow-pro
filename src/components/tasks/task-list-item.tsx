'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTaskService } from '@/hooks/use-services'
import { ActionIcons, MiscIcons, PriorityIcons, StatusIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { ModalType, Priority, TaskStatus, type Task } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { toast } from 'sonner'

interface TaskListItemProps {
  task: Task & { projectId?: string; projectName?: string; projectColor?: string }
  onUpdate?: () => void
}

const priorityColors: Record<Priority, string> = {
  [Priority.LOW]: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  [Priority.MEDIUM]: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  [Priority.HIGH]: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  [Priority.URGENT]: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const statusIcons: Record<TaskStatus, React.ComponentType<{ className?: string }>> = {
  [TaskStatus.TODO]: StatusIcons.todo,
  [TaskStatus.IN_PROGRESS]: StatusIcons.inProgress,
  [TaskStatus.IN_REVIEW]: StatusIcons.inReview,
  [TaskStatus.DONE]: StatusIcons.done,
  [TaskStatus.CANCELLED]: StatusIcons.cancelled,
}

export function TaskListItem({ task, onUpdate }: TaskListItemProps) {
  const t = useTranslations()
  const locale = useLocale()
  const { openModal } = useUIStore()
  const taskService = useTaskService()

  const PriorityIcon = PriorityIcons[task.priority.toLowerCase() as keyof typeof PriorityIcons]
  const StatusIcon = statusIcons[task.status]
  const CalendarIcon = MiscIcons.calendar

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE
  const isDone = task.status === TaskStatus.DONE

  const handleToggleDone = async () => {
    const newStatus = isDone ? TaskStatus.TODO : TaskStatus.DONE
    
    const result = await taskService.updateTask(task.id, { status: newStatus })
    
    if (result.success) {
      toast.success(isDone ? t('tasks.taskReopened') : t('tasks.taskCompleted'))
      onUpdate?.()
    } else {
      toast.error(t('errors.somethingWentWrong'))
    }
  }

  return (
    <Card className={cn(
      'p-4 hover:shadow-md transition-shadow',
      isDone && 'opacity-60'
    )}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <Checkbox
          checked={isDone}
          onCheckedChange={handleToggleDone}
          className="mt-1"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                'font-medium truncate',
                isDone && 'line-through text-muted-foreground'
              )}>
                {task.title}
              </h4>
              
              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {task.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <ActionIcons.moreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openModal(ModalType.EDIT_TASK, task)}>
                  <ActionIcons.edit className="mr-2 h-4 w-4" />
                  {t('common.edit')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => openModal(ModalType.DELETE_TASK, task)}
                  className="text-destructive"
                >
                  <ActionIcons.delete className="mr-2 h-4 w-4" />
                  {t('common.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {/* Project */}
            {task.projectName && (
              <Link href={`/${locale}/projects/${task.projectId}`}>
                <Badge variant="outline" className="gap-1 hover:bg-accent">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: task.projectColor }}
                  />
                  {task.projectName}
                </Badge>
              </Link>
            )}

            {/* Status */}
            <Badge variant="secondary" className="gap-1">
              <StatusIcon className="h-3 w-3" />
              {t(`tasks.statuses.${task.status.toLowerCase()}`)}
            </Badge>

            {/* Priority */}
            <Badge className={cn('gap-1', priorityColors[task.priority])}>
              <PriorityIcon className="h-3 w-3" />
              {t(`tasks.priorities.${task.priority.toLowerCase()}`)}
            </Badge>

            {/* Due Date */}
            {task.dueDate && (
              <Badge 
                variant={isOverdue ? 'destructive' : 'outline'} 
                className="gap-1"
              >
                <CalendarIcon className="h-3 w-3" />
                {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: fr })}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}