import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ projectId: string }>
}

// GET /api/projects/[projectId]/board
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { projectId } = await params

    const project = await db.project.findUnique({
      where: { id: projectId },
    })
    if (!project) {
      return notFoundResponse('Project not found')
    }

    const board = await db.board.findFirst({
      where: { projectId },
      include: {
        columns: {
          orderBy: { position: 'asc' },
          include: {
            tasks: {
              orderBy: { position: 'asc' },
              include: {
                assignee: true,
                checklists: true,
                comments: {
                  include: { author: true },
                  orderBy: { createdAt: 'desc' },
                },
              },
            },
          },
        },
      },
    })

    if (!board) {
      // Créer un board par défaut s'il n'existe pas
      const newBoard = await db.board.create({
        data: {
          name: 'Board principal',
          projectId,
          columns: {
            create: [
              { name: 'À faire', position: 0, color: '#6b7280' },
              { name: 'En cours', position: 1, color: '#3b82f6' },
              { name: 'En revue', position: 2, color: '#8b5cf6' },
              { name: 'Terminé', position: 3, color: '#10b981' },
            ],
          },
        },
        include: {
          columns: {
            orderBy: { position: 'asc' },
            include: {
              tasks: {
                orderBy: { position: 'asc' },
              },
            },
          },
        },
      })

      return successResponse({ board: newBoard })
    }

    return successResponse({ board })
  } catch (error) {
    console.error('GET /api/projects/[projectId]/board error:', error)
    return serverErrorResponse()
  }
}