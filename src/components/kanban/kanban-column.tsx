'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ActionIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { ModalType, type Column, type Task } from '@/types'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { KanbanCard } from './kanban-card'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const t = useTranslations()
  const { openModal } = useUIStore()

  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: 'column',
      column,
    },
  })

  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks])

  return (
    <div
      className={cn(
        'flex flex-col w-80 shrink-0 bg-muted/50 rounded-lg transition-all',
        isOver && 'ring-2 ring-primary ring-offset-2 bg-primary/5'
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="font-semibold text-sm">{column.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ActionIcons.moreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ActionIcons.edit className="mr-2 h-4 w-4" />
              {t('common.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <ActionIcons.delete className="mr-2 h-4 w-4" />
              {t('common.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tasks List */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-2 space-y-2 overflow-y-auto min-h-[200px]',
          tasks.length === 0 && 'flex items-center justify-center'
        )}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <KanbanCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              {isOver ? (
                <span className="text-primary font-medium">
                  {t('tasks.dropHere')}
                </span>
              ) : (
                t('tasks.noTasks')
              )}
            </div>
          )}
        </SortableContext>
      </div>

      {/* Add Task Button */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => openModal(ModalType.CREATE_TASK, { columnId: column.id })}
        >
          <ActionIcons.add className="mr-2 h-4 w-4" />
          {t('tasks.newTask')}
        </Button>
      </div>
    </div>
  )
}