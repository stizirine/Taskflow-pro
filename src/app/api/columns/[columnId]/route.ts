import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ columnId: string }>
}

// PATCH /api/columns/[columnId]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { columnId } = await params
    const body = await request.json()

    const existingColumn = await db.column.findUnique({
      where: { id: columnId },
    })

    if (!existingColumn) {
      return notFoundResponse('Column not found')
    }

    const column = await db.column.update({
      where: { id: columnId },
      data: body,
      include: {
        tasks: {
          orderBy: { position: 'asc' },
        },
      },
    })

    return successResponse({ column })
  } catch (error) {
    console.error('PATCH /api/columns/[columnId] error:', error)
    return serverErrorResponse()
  }
}

// DELETE /api/columns/[columnId]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { columnId } = await params

    const existingColumn = await db.column.findUnique({
      where: { id: columnId },
    })

    if (!existingColumn) {
      return notFoundResponse('Column not found')
    }

    await db.column.delete({
      where: { id: columnId },
    })

    return successResponse({ success: true })
  } catch (error) {
    console.error('DELETE /api/columns/[columnId] error:', error)
    return serverErrorResponse()
  }
}