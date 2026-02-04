import { errorResponse, notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ taskId: string }>
}

// POST /api/tasks/[taskId]/move
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params
    const { toColumnId, position } = await request.json()

    if (!toColumnId || position === undefined) {
      return errorResponse('toColumnId and position are required')
    }

    const existingTask = await db.task.findUnique({
      where: { id: taskId },
    })

    if (!existingTask) {
      return notFoundResponse('Task not found')
    }

    const oldColumnId = existingTask.columnId

    // Transaction pour mettre à jour les positions
    await db.$transaction(async (tx) => {
      // Si on déplace vers une autre colonne
      if (oldColumnId !== toColumnId) {
        // Réordonner l'ancienne colonne
        await tx.task.updateMany({
          where: {
            columnId: oldColumnId,
            position: { gt: existingTask.position },
          },
          data: {
            position: { decrement: 1 },
          },
        })

        // Faire de la place dans la nouvelle colonne
        await tx.task.updateMany({
          where: {
            columnId: toColumnId,
            position: { gte: position },
          },
          data: {
            position: { increment: 1 },
          },
        })
      } else {
        // Déplacement dans la même colonne
        if (position > existingTask.position) {
          // Déplacement vers le bas
          await tx.task.updateMany({
            where: {
              columnId: toColumnId,
              position: { gt: existingTask.position, lte: position },
            },
            data: {
              position: { decrement: 1 },
            },
          })
        } else if (position < existingTask.position) {
          // Déplacement vers le haut
          await tx.task.updateMany({
            where: {
              columnId: toColumnId,
              position: { gte: position, lt: existingTask.position },
            },
            data: {
              position: { increment: 1 },
            },
          })
        }
      }

      // Mettre à jour la tâche
      await tx.task.update({
        where: { id: taskId },
        data: {
          columnId: toColumnId,
          position,
          updatedAt: new Date(),
        },
      })
    })

    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { assignee: true },
    })

    return successResponse({ task })
  } catch (error) {
    console.error('POST /api/tasks/[taskId]/move error:', error)
    return serverErrorResponse()
  }
}