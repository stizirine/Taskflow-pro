import { defaultLocale, locales } from '@/i18n/config'
import createIntlMiddleware from 'next-intl/middleware'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

// Routes publiques (pas besoin d'authentification)
const publicRoutes = ['/login', '/register', '/forgot-password']

// Routes d'API à ignorer
const ignoredRoutes = ['/api', '/_next', '/static', '/favicon.ico']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorer les routes API et assets
  if (ignoredRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Appliquer le middleware i18n
  const response = intlMiddleware(request)

  // Extraire le pathname sans la locale
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en|es)/, '') || '/'

  // Vérifier si c'est une route publique
  const isPublicRoute = publicRoutes.some((route) =>
    pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(route)
  )

  // Si route publique, pas besoin de vérifier l'auth
  if (isPublicRoute) {
    return response
  }

  // Vérifier l'authentification via le JWT (sans charger Prisma/pg, compatible Edge)
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  if (!token) {
    const locale = pathname.split('/')[1] || defaultLocale
    const loginUrl = new URL(`/${locale}/login`, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*).*)'],
}