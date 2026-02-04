'use client'

import { Button } from '@/components/ui/button'
import { ActionIcons } from '@/lib/icons'
import { useTaskStore } from '@/stores'
import { type Column, type Task } from '@/types'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'
import { KanbanCard } from './kanban-card'
import { KanbanColumn } from './kanban-column'

export function KanbanBoard() {
  const t = useTranslations()
  const board = useTaskStore((state) => state.board)
  const setBoard = useTaskStore((state) => state.setBoard)
  
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const columns = useMemo(() => board?.columns ?? [], [board])

  // Trouver la colonne qui contient une tâche
  const findColumnByTaskId = useCallback(
    (taskId: UniqueIdentifier): Column | undefined => {
      return columns.find((col) => col.tasks.some((task) => task.id === taskId))
    },
    [columns]
  )

  // Trouver une colonne par son ID (avec le préfixe "column-")
  const findColumnById = useCallback(
    (id: UniqueIdentifier): Column | undefined => {
      const columnId = String(id).replace('column-', '')
      return columns.find((col) => col.id === columnId)
    },
    [columns]
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeData = active.data.current

    if (activeData?.type === 'task') {
      setActiveTask(activeData.task)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || !board) return

    const activeId = active.id
    const overId = over.id

    // Trouver les colonnes source et destination
    const activeColumn = findColumnByTaskId(activeId)
    let overColumn = findColumnByTaskId(overId)

    // Si on est au-dessus d'une colonne vide
    if (!overColumn && String(overId).startsWith('column-')) {
      overColumn = findColumnById(overId)
    }

    if (!activeColumn || !overColumn) return
    if (activeColumn.id === overColumn.id) return

    // Déplacer la tâche vers une autre colonne
    const activeTask = activeColumn.tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId)

    const newColumns = columns.map((col) => {
      // Retirer de la colonne source
      if (col.id === activeColumn.id) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== activeId),
        }
      }
      // Ajouter à la colonne destination
      if (col.id === overColumn.id) {
        const updatedTask = { ...activeTask, columnId: col.id }
        const newTasks = [...col.tasks]
        
        if (overTaskIndex >= 0) {
          // Insérer à la position de la tâche survolée
          newTasks.splice(overTaskIndex, 0, updatedTask)
        } else {
          // Ajouter à la fin si on survole la colonne elle-même
          newTasks.push(updatedTask)
        }
        
        return {
          ...col,
          tasks: newTasks.map((t, index) => ({ ...t, position: index })),
        }
      }
      return col
    })

    setBoard({ ...board, columns: newColumns })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveTask(null)

    if (!over || !board) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeColumn = findColumnByTaskId(activeId)
    let overColumn = findColumnByTaskId(overId)

    // Si on est au-dessus d'une colonne vide
    if (!overColumn && String(overId).startsWith('column-')) {
      overColumn = findColumnById(overId)
    }

    if (!activeColumn || !overColumn) return

    // Réordonner dans la même colonne
    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.tasks.findIndex((t) => t.id === activeId)
      const newIndex = activeColumn.tasks.findIndex((t) => t.id === overId)

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newColumns = columns.map((col) => {
          if (col.id === activeColumn.id) {
            const reorderedTasks = arrayMove(col.tasks, oldIndex, newIndex)
            return {
              ...col,
              tasks: reorderedTasks.map((t, index) => ({ ...t, position: index })),
            }
          }
          return col
        })

        setBoard({ ...board, columns: newColumns })
      }
    }
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        {t('common.loading')}
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={column.tasks}
          />
        ))}

        {/* Add Column Button */}
        <div className="w-80 shrink-0">
          <Button
            variant="outline"
            className="w-full h-12 border-dashed"
          >
            <ActionIcons.add className="mr-2 h-4 w-4" />
            {t('common.create')}
          </Button>
        </div>
      </div>

      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeTask && <KanbanCard task={activeTask} overlay />}
      </DragOverlay>
    </DndContext>
  )
}