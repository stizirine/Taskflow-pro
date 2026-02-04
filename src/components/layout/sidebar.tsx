'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ActionIcons, NavIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useProjectStore, useUIStore } from '@/stores'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarProjectItem } from './sidebar-project-item'

export function Sidebar() {
  const t = useTranslations()
  const { sidebarCollapsed } = useUIStore()
  const projects = useProjectStore((state) => state.projects)
  const favoriteProjects = useMemo(
    () => projects.filter((p) => p.isFavorite && !p.isArchived),
    [projects]
  )

  const PlusIcon = ActionIcons.add
  const StarIcon = ActionIcons.favorite

  const navItems = [
    {
      href: '/dashboard',
      icon: NavIcons.dashboard,
      label: t('navigation.dashboard'),
    },
    {
      href: '/projects',
      icon: NavIcons.projects,
      label: t('navigation.projects'),
    },
    {
      href: '/tasks',
      icon: NavIcons.tasks,
      label: t('navigation.tasks'),
    },
    {
      href: '/team',
      icon: NavIcons.team,
      label: t('navigation.team'),
    },
    {
      href: '/settings',
      icon: NavIcons.settings,
      label: t('navigation.settings'),
    },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <ScrollArea className="h-full py-4">
        <div className="px-3 space-y-4">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                collapsed={sidebarCollapsed}
              />
            ))}
          </nav>

          <Separator />

          {/* Favorite Projects */}
          <div className="space-y-2">
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <StarIcon className="h-3 w-3" />
                  <span>{t('projects.favorites')}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  title={t('projects.newProject')}
                >
                  <PlusIcon className="h-3 w-3" />
                </Button>
              </div>
            )}

            <nav className="space-y-1">
              {favoriteProjects.length === 0 ? (
                !sidebarCollapsed && (
                  <p className="px-3 text-xs text-muted-foreground">
                    {t('common.noResults')}
                  </p>
                )
              ) : (
                favoriteProjects.map((project) => (
                  <SidebarProjectItem
                    key={project.id}
                    project={project}
                    collapsed={sidebarCollapsed}
                  />
                ))
              )}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}