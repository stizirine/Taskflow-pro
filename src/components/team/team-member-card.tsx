'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ActionIcons } from '@/lib/icons'
import { ProjectRole, type User } from '@/types'
import { useTranslations } from 'next-intl'

interface TeamMemberCardProps {
  member: {
    id: string
    user: User
    role: ProjectRole
    joinedAt: Date
  }
  isOwner: boolean
  canManage: boolean
  onRoleChange?: (role: ProjectRole) => void
  onRemove?: () => void
}

const roleColors: Record<ProjectRole, string> = {
  [ProjectRole.OWNER]: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  [ProjectRole.ADMIN]: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  [ProjectRole.MEMBER]: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  [ProjectRole.VIEWER]: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

export function TeamMemberCard({
  member,
  isOwner: _isOwner,
  canManage,
  onRoleChange,
  onRemove,
}: TeamMemberCardProps) {
  const t = useTranslations()

  const initials = member.user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || member.user.email[0].toUpperCase()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.user.image || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{member.user.name || member.user.email}</h4>
            <p className="text-sm text-muted-foreground truncate">{member.user.email}</p>
          </div>

          <div className="flex items-center gap-2">
            {canManage && member.role !== ProjectRole.OWNER ? (
              <Select
                value={member.role}
                onValueChange={(value) => onRoleChange?.(value as ProjectRole)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProjectRole.ADMIN}>
                    {t('team.roles.admin')}
                  </SelectItem>
                  <SelectItem value={ProjectRole.MEMBER}>
                    {t('team.roles.member')}
                  </SelectItem>
                  <SelectItem value={ProjectRole.VIEWER}>
                    {t('team.roles.viewer')}
                  </SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge className={roleColors[member.role]}>
                {t(`team.roles.${member.role.toLowerCase()}`)}
              </Badge>
            )}

            {canManage && member.role !== ProjectRole.OWNER && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ActionIcons.moreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={onRemove}
                    className="text-destructive"
                  >
                    <ActionIcons.delete className="mr-2 h-4 w-4" />
                    {t('team.removeMember')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}