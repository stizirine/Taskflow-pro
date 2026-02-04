import createIntlMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n/config'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

// Routes publiques (pas besoin d'authentification)
const publicPatterns = [
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth',
  '/api/health',
]

// Vérifie si c'est une route publique
function isPublicRoute(pathname: string): boolean {
  // Retirer la locale du pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en|es)/, '') || '/'
  
  return publicPatterns.some((pattern) => 
    pathnameWithoutLocale === pattern || 
    pathnameWithoutLocale.startsWith(`${pattern}/`) ||
    pathnameWithoutLocale.startsWith(pattern)
  )
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Ignorer les assets et fichiers statiques
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/health')
  ) {
    return NextResponse.next()
  }

  // 2. Appliquer le middleware i18n
  const response = intlMiddleware(request)

  // 3. Si route publique, pas de vérification auth
  if (isPublicRoute(pathname)) {
    return response
  }

  // 4. Vérifier le token de session (côté serveur uniquement)
  const token = request.cookies.get('authjs.session-token')?.value ||
                request.cookies.get('__Secure-authjs.session-token')?.value

  // 5. Si pas de token et route protégée, rediriger vers login
  if (!token) {
    const locale = pathname.split('/')[1] || defaultLocale
    const loginUrl = new URL(`/${locale}/login`, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|static|.*\\..*).*)'],
}