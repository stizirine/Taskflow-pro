'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ActionIcons, MiscIcons, PriorityIcons, UIIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { ModalType, Priority, type Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useTranslations } from 'next-intl'

interface KanbanCardProps {
  task: Task
  overlay?: boolean
}

const priorityColors: Record<Priority, string> = {
  [Priority.LOW]: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  [Priority.MEDIUM]: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  [Priority.HIGH]: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  [Priority.URGENT]: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function KanbanCard({ task, overlay = false }: KanbanCardProps) {
  const t = useTranslations()
  const { openModal } = useUIStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const PriorityIcon = PriorityIcons[task.priority.toLowerCase() as keyof typeof PriorityIcons]
  const CalendarIcon = MiscIcons.calendar
  const GripIcon = UIIcons.grip

  // Overlay card (pendant le drag)
  if (overlay) {
    return (
      <Card className="cursor-grabbing shadow-xl rotate-2 border-primary">
        <CardHeader className="p-3 pb-0">
          <p className="font-medium text-sm line-clamp-2">{task.title}</p>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <Badge className={cn('text-xs', priorityColors[task.priority])}>
            <PriorityIcon className="h-3 w-3 mr-1" />
            {t(`tasks.priorities.${task.priority.toLowerCase()}`)}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  // Placeholder quand on drag (la carte d'origine)
  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="opacity-40 border-2 border-dashed border-primary bg-primary/5"
      >
        <CardHeader className="p-3 pb-0">
          <p className="font-medium text-sm line-clamp-2">{task.title}</p>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <Badge className={cn('text-xs', priorityColors[task.priority])}>
            <PriorityIcon className="h-3 w-3 mr-1" />
            {t(`tasks.priorities.${task.priority.toLowerCase()}`)}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'group cursor-grab active:cursor-grabbing transition-all',
        'hover:shadow-md hover:border-primary/50'
      )}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <GripIcon className="h-4 w-4 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            <p className="font-medium text-sm line-clamp-2">{task.title}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
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
      </CardHeader>
      
      <CardContent className="p-3 pt-2 space-y-2">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between gap-2">
          <Badge className={cn('text-xs', priorityColors[task.priority])}>
            <PriorityIcon className="h-3 w-3 mr-1" />
            {t(`tasks.priorities.${task.priority.toLowerCase()}`)}
          </Badge>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3" />
              <span>{format(new Date(task.dueDate), 'dd MMM', { locale: fr })}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}