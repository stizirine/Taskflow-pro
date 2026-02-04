import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ projectId: string }>
}

// GET /api/projects/[projectId]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { projectId } = await params

    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        members: {
          include: { user: true },
        },
      },
    })

    if (!project) {
      return notFoundResponse('Project not found')
    }

    return successResponse({ project })
  } catch (error) {
    console.error('GET /api/projects/[projectId] error:', error)
    return serverErrorResponse()
  }
}

// PATCH /api/projects/[projectId]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { projectId } = await params
    const body = await request.json()

    const existingProject = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!existingProject) {
      return notFoundResponse('Project not found')
    }

    const project = await db.project.update({
      where: { id: projectId },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    })

    return successResponse({ project })
  } catch (error) {
    console.error('PATCH /api/projects/[projectId] error:', error)
    return serverErrorResponse()
  }
}

// DELETE /api/projects/[projectId]
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { projectId } = await params

    const existingProject = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!existingProject) {
      return notFoundResponse('Project not found')
    }

    await db.project.delete({
      where: { id: projectId },
    })

    return successResponse({ success: true })
  } catch (error) {
    console.error('DELETE /api/projects/[projectId] error:', error)
    return serverErrorResponse()
  }
}