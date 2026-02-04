'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NavIcons, UIIcons } from '@/lib/icons'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const LogoIcon = NavIcons.dashboard
  const LoaderIcon = UIIcons.loader

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    void data // utilisé pour signature useForm, envoi email non implémenté
    setIsLoading(true)
    try {
      // TODO: appeler l'API de réinitialisation (ex. Resend, SendGrid, action serveur)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
      toast.success(t('auth.resetEmailSent'))
    } catch {
      toast.error(t('errors.somethingWentWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LogoIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('auth.forgotPasswordTitle')}</CardTitle>
          <CardDescription>{t('auth.resetEmailSent')}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${locale}/login`}>{t('auth.backToLogin')}</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <LogoIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">{t('auth.forgotPasswordTitle')}</CardTitle>
        <CardDescription>{t('auth.forgotPasswordDescription')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            {t('auth.sendResetLink')}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Link
          href={`/${locale}/login`}
          className="text-sm text-primary hover:underline font-medium"
        >
          {t('auth.backToLogin')}
        </Link>
      </CardFooter>
    </Card>
  )
}
