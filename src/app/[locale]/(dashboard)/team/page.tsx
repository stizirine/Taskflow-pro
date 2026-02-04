'use client'

import { TeamMemberCard } from '@/components/team/team-member-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'
import { ActionIcons, NavIcons } from '@/lib/icons'
import { mockMembers, mockPendingInvitations } from '@/services/mock/team.mock'
import { useUIStore } from '@/stores'
import { ModalType, ProjectRole } from '@/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function TeamPage() {
  const t = useTranslations()
  const { user } = useAuth()
  const { openModal } = useUIStore()
  const [searchQuery, setSearchQuery] = useState('')

  const TeamIcon = NavIcons.team
  const PlusIcon = ActionIcons.add
  const SearchIcon = ActionIcons.search

  const isOwner = mockMembers.some(
    (m) => m.user.id === user?.id && m.role === ProjectRole.OWNER
  )
  const canManage = mockMembers.some(
    (m) => m.user.id === user?.id && (m.role === ProjectRole.OWNER || m.role === ProjectRole.ADMIN)
  )

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const admins = filteredMembers.filter(
    (m) => m.role === ProjectRole.OWNER || m.role === ProjectRole.ADMIN
  )
  const members = filteredMembers.filter((m) => m.role === ProjectRole.MEMBER)
  const viewers = filteredMembers.filter((m) => m.role === ProjectRole.VIEWER)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TeamIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('navigation.team')}</h1>
            <p className="text-muted-foreground">
              {t('team.membersCount', { count: mockMembers.length })}
            </p>
          </div>
        </div>

        {canManage && (
          <Button onClick={() => openModal(ModalType.INVITE_MEMBER)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('team.inviteMember')}
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('team.searchMembers')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">
            {t('team.members')} ({mockMembers.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {t('team.pendingInvitations')} ({mockPendingInvitations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6 space-y-6">
          {/* Admins */}
          {admins.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t('team.administrators')} ({admins.length})
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {admins.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={isOwner}
                    canManage={canManage}
                    onRoleChange={(role) => console.log('Change role:', role)}
                    onRemove={() => console.log('Remove member')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Members */}
          {members.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t('team.members')} ({members.length})
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {members.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={isOwner}
                    canManage={canManage}
                    onRoleChange={(role) => console.log('Change role:', role)}
                    onRemove={() => console.log('Remove member')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Viewers */}
          {viewers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t('team.viewers')} ({viewers.length})
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {viewers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={isOwner}
                    canManage={canManage}
                    onRoleChange={(role) => console.log('Change role:', role)}
                    onRemove={() => console.log('Remove member')}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredMembers.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TeamIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('common.noResults')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6 space-y-3">
          {mockPendingInvitations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TeamIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('team.noPendingInvitations')}</p>
              </CardContent>
            </Card>
          ) : (
            mockPendingInvitations.map((invitation) => (
              <Card key={invitation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(`team.roles.${invitation.role.toLowerCase()}`)} • {t('team.expires')}{' '}
                        {invitation.expiresAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t('team.resend')}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        {t('common.cancel')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}