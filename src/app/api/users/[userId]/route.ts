import { notFoundResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { NextRequest } from 'next/server'

interface Params {
  params: Promise<{ userId: string }>
}

// GET /api/users/[userId]
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await params

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        locale: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return notFoundResponse('User not found')
    }

    return successResponse({ user })
  } catch (error) {
    console.error('GET /api/users/[userId] error:', error)
    return serverErrorResponse()
  }
}

// PATCH /api/users/[userId]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { userId } = await params
    const body = await request.json()

    const existingUser = await db.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return notFoundResponse('User not found')
    }

    const { name, image, locale } = body
    const updateData: { name?: string; image?: string; locale?: string; updatedAt: Date } = {
      updatedAt: new Date(),
    }
    if (typeof name !== 'undefined') updateData.name = name
    if (typeof image !== 'undefined') updateData.image = image
    if (typeof locale !== 'undefined') updateData.locale = locale

    const user = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        locale: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return successResponse({ user })
  } catch (error) {
    console.error('PATCH /api/users/[userId] error:', error)
    return serverErrorResponse()
  }
}
