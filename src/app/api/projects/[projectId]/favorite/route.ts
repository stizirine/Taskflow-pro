import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ projectId: string }>
}

// POST /api/projects/[projectId]/favorite
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { projectId } = await params

    const existingProject = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!existingProject) {
      return notFoundResponse('Project not found')
    }

    const project = await db.project.update({
      where: { id: projectId },
      data: {
        isFavorite: !existingProject.isFavorite,
        updatedAt: new Date(),
      },
    })

    return successResponse({ project })
  } catch (error) {
    console.error('POST /api/projects/[projectId]/favorite error:', error)
    return serverErrorResponse()
  }
}