import { errorResponse, serverErrorResponse, successResponse, unauthorizedResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { projectSchema } from '@/lib/validations/project'
import { NextRequest } from 'next/server'

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const isFavorite = searchParams.get('isFavorite')
    const isArchived = searchParams.get('isArchived')

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (isFavorite !== null) {
      where.isFavorite = isFavorite === 'true'
    }

    if (isArchived !== null) {
      where.isArchived = isArchived === 'true'
    }

    const projects = await db.project.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    })

    return successResponse({ projects })
  } catch (error) {
    console.error('GET /api/projects error:', error)
    return serverErrorResponse()
  }
}

// POST /api/projects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = projectSchema.safeParse(body)
    
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message)
    }

    const { name, description, color, icon } = validation.data

    // TODO: Récupérer l'utilisateur connecté depuis la session NextAuth
    const firstUser = await db.user.findFirst({ select: { id: true } })
    if (!firstUser) {
      return unauthorizedResponse('Aucun utilisateur. Inscrivez-vous d\'abord.')
    }
    const ownerId = firstUser.id

    const project = await db.project.create({
      data: {
        name,
        description: description || null,
        color,
        icon,
        ownerId,
      },
    })

    // Créer un board par défaut avec des colonnes
    await db.board.create({
      data: {
        name: 'Board principal',
        projectId: project.id,
        columns: {
          create: [
            { name: 'À faire', position: 0, color: '#6b7280' },
            { name: 'En cours', position: 1, color: '#3b82f6' },
            { name: 'En revue', position: 2, color: '#8b5cf6' },
            { name: 'Terminé', position: 3, color: '#10b981' },
          ],
        },
      },
    })

    return successResponse({ project }, 201)
  } catch (error) {
    console.error('POST /api/projects error:', error)
    return serverErrorResponse()
  }
}