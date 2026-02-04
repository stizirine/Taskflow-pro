import { errorResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

// POST /api/columns
export async function POST(request: NextRequest) {
  try {
    const { name, color, boardId } = await request.json()

    if (!name || !boardId) {
      return errorResponse('Name and boardId are required')
    }

    // Trouver la position max
    const maxPositionColumn = await db.column.findFirst({
      where: { boardId },
      orderBy: { position: 'desc' },
    })

    const position = maxPositionColumn ? maxPositionColumn.position + 1 : 0

    const column = await db.column.create({
      data: {
        name,
        color: color || '#6b7280',
        position,
        boardId,
      },
      include: {
        tasks: true,
      },
    })

    return successResponse({ column }, 201)
  } catch (error) {
    console.error('POST /api/columns error:', error)
    return serverErrorResponse()
  }
}