'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const locale = useLocale()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error('Email ou mot de passe incorrect')
    }

    router.push(`/${locale}/dashboard`)
    router.refresh()
  }

  const loginWithGoogle = async () => {
    await signIn('google', {
      callbackUrl: `/${locale}/dashboard`,
    })
  }

  const loginWithGitHub = async () => {
    await signIn('github', {
      callbackUrl: `/${locale}/dashboard`,
    })
  }

  const logout = async () => {
    await signOut({
      callbackUrl: `/${locale}/login`,
    })
  }

  const updateSession = async (data: Partial<{ name: string; email: string; image: string }>) => {
    await update(data)
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    updateSession,
  }
}