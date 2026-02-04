import { errorResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { taskSchema } from '@/lib/validations/task'
import { NextRequest } from 'next/server'

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = taskSchema.safeParse(body)
    
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message)
    }

    const { title, description, priority, dueDate } = validation.data
    const { columnId, assigneeId } = body

    if (!columnId) {
      return errorResponse('Column ID is required')
    }

    // Trouver la position max dans la colonne
    const maxPositionTask = await db.task.findFirst({
      where: { columnId },
      orderBy: { position: 'desc' },
    })

    const position = maxPositionTask ? maxPositionTask.position + 1 : 0

    const task = await db.task.create({
      data: {
        title,
        description: description || null,
        priority,
        status: 'TODO',
        dueDate: dueDate ? new Date(dueDate) : null,
        columnId,
        assigneeId: assigneeId || null,
        position,
      },
      include: {
        assignee: true,
      },
    })

    return successResponse({ task }, 201)
  } catch (error) {
    console.error('POST /api/tasks error:', error)
    return serverErrorResponse()
  }
}