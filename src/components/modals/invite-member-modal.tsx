'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UIIcons } from '@/lib/icons'
import { useUIStore } from '@/stores'
import { ModalType, ProjectRole } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const inviteSchema = z.object({
  email: z.string().email('Email invalide'),
  role: z.nativeEnum(ProjectRole),
})

type InviteFormData = z.infer<typeof inviteSchema>

export function InviteMemberModal() {
  const t = useTranslations()
  const { modal, closeModal } = useUIStore()
  const [isLoading, setIsLoading] = useState(false)

  const LoaderIcon = UIIcons.loader

  const isOpen = modal.isOpen && modal.type === ModalType.INVITE_MEMBER

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: ProjectRole.MEMBER,
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library -- watch() de react-hook-form utilisé de façon contrôlée
  const watchRole = watch('role')

  const onSubmit = async (data: InviteFormData) => {
    setIsLoading(true)

    // Simuler l'envoi d'invitation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success(t('team.invitationSent', { email: data.email }))
    reset()
    closeModal()
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('team.inviteMember')}</DialogTitle>
          <DialogDescription>
            {t('team.inviteDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('team.role')}</Label>
            <Select
              value={watchRole}
              onValueChange={(value) => setValue('role', value as ProjectRole)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ProjectRole.ADMIN}>
                  <div>
                    <p className="font-medium">{t('team.roles.admin')}</p>
                    <p className="text-xs text-muted-foreground">
                      {t('team.roleDescriptions.admin')}
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value={ProjectRole.MEMBER}>
                  <div>
                    <p className="font-medium">{t('team.roles.member')}</p>
                    <p className="text-xs text-muted-foreground">
                      {t('team.roleDescriptions.member')}
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value={ProjectRole.VIEWER}>
                  <div>
                    <p className="font-medium">{t('team.roles.viewer')}</p>
                    <p className="text-xs text-muted-foreground">
                      {t('team.roleDescriptions.viewer')}
                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal} disabled={isLoading}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              {t('team.sendInvitation')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}