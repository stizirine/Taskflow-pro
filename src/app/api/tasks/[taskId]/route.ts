import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ taskId: string }>
}

// GET /api/tasks/[taskId]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params

    const task = await db.task.findUnique({
      where: { id: taskId },
      include: {
        assignee: true,
        checklists: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: 'desc' },
        },
        subTasks: true,
      },
    })

    if (!task) {
      return notFoundResponse('Task not found')
    }

    return successResponse({ task })
  } catch (error) {
    console.error('GET /api/tasks/[taskId] error:', error)
    return serverErrorResponse()
  }
}

// PATCH /api/tasks/[taskId]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params
    const body = await request.json()

    const existingTask = await db.task.findUnique({
      where: { id: taskId },
    })

    if (!existingTask) {
      return notFoundResponse('Task not found')
    }

    // Convertir dueDate si présent
    const data = { ...body }
    if (data.dueDate !== undefined) {
      data.dueDate = data.dueDate ? new Date(data.dueDate) : null
    }

    const task = await db.task.update({
      where: { id: taskId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        assignee: true,
      },
    })

    return successResponse({ task })
  } catch (error) {
    console.error('PATCH /api/tasks/[taskId] error:', error)
    return serverErrorResponse()
  }
}

// DELETE /api/tasks/[taskId]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { taskId } = await params

    const existingTask = await db.task.findUnique({
      where: { id: taskId },
    })

    if (!existingTask) {
      return notFoundResponse('Task not found')
    }

    await db.task.delete({
      where: { id: taskId },
    })

    return successResponse({ success: true })
  } catch (error) {
    console.error('DELETE /api/tasks/[taskId] error:', error)
    return serverErrorResponse()
  }
}