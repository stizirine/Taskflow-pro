import { errorResponse, serverErrorResponse, successResponse } from '@/lib/api-response'
import { db } from '@/lib/db'
import { registerSchema } from '@/lib/validations/auth'
import { hash } from 'bcryptjs'
import { NextRequest } from 'next/server'

// POST /api/auth/register
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = registerSchema.safeParse(body)
    
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message)
    }

    const { name, email, password } = validation.data

    // Vérifier si l'email existe déjà
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return errorResponse('Cet email est déjà utilisé', 409)
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        locale: true,
      },
    })

    return successResponse({ user }, 201)
  } catch (error) {
    console.error('POST /api/auth/register error:', error)
    return serverErrorResponse()
  }
}