'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { GitHubIcon, GoogleIcon } from '@/components/ui/brand-icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { MiscIcons, NavIcons, UIIcons } from '@/lib/icons'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function LoginPage() {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const { login, loginWithGoogle, loginWithGitHub } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const authError = searchParams.get('error')

  const LogoIcon = NavIcons.dashboard
  const LoaderIcon = UIIcons.loader
  const AlertIcon = MiscIcons.alert

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await login(data.email, data.password)
      toast.success(t('auth.loginSuccess'))
    } catch {
      setError(t('auth.invalidCredentials'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      await loginWithGoogle()
    } catch {
      toast.error(t('errors.somethingWentWrong'))
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleGitHubLogin = async () => {
    setIsGitHubLoading(true)
    try {
      await loginWithGitHub()
    } catch {
      toast.error(t('errors.somethingWentWrong'))
    } finally {
      setIsGitHubLoading(false)
    }
  }

  const isAnyLoading = isLoading || isGoogleLoading || isGitHubLoading

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <LogoIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
        <CardDescription>{t('common.appName')}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error messages */}
        {(error || authError) && (
          <Alert variant="destructive">
            <AlertIcon className="h-4 w-4" />
            <AlertDescription>
              {error || t('auth.authError')}
            </AlertDescription>
          </Alert>
        )}

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isAnyLoading}
          >
            {isGoogleLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
          <Button
            variant="outline"
            onClick={handleGitHubLogin}
            disabled={isAnyLoading}
          >
            {isGitHubLoading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GitHubIcon className="mr-2 h-4 w-4" />
            )}
            GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            {t('auth.orContinueWith')}
          </span>
        </div>

        {/* Credentials form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              disabled={isAnyLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Link
                href={`/${locale}/forgot-password`}
                className="text-sm text-primary hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password')}
              disabled={isAnyLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isAnyLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {t('auth.login')}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <Link
            href={`/${locale}/register`}
            className="text-primary hover:underline font-medium"
          >
            {t('auth.register')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}