'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DynamicProjectIcon } from '@/components/ui/dynamic-icon'
import { useAuth } from '@/hooks/use-auth'
import {
  ActionIcons,
  AuthIcons,
  NavIcons,
  ThemeIcons,
  UIIcons
} from '@/lib/icons'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType } from '@/types'
import { Command } from 'cmdk'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()
  const { setTheme, theme } = useTheme()
  const { user, logout } = useAuth()
  const { openModal } = useUIStore()
  const projects = useProjectStore((state) => state.projects)

  // Raccourci clavier ⌘K ou Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    setSearch('')
    command()
  }, [])

  // Navigation
  const navigate = useCallback(
    (path: string) => {
      runCommand(() => router.push(`/${locale}${path}`))
    },
    [locale, router, runCommand]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 overflow-hidden max-w-2xl"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">
          {t('commandPalette.placeholder')}
        </DialogTitle>
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1
            return 0
          }}
        >
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
            <ActionIcons.search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder={t('commandPalette.placeholder')}
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              {t('commandPalette.noResults')}
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group heading={t('commandPalette.quickActions')}>
              <Command.Item
                value="new-project"
                onSelect={() => runCommand(() => openModal(ModalType.CREATE_PROJECT))}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <ActionIcons.add className="h-4 w-4" />
                <span>{t('projects.newProject')}</span>
                <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                  P
                </kbd>
              </Command.Item>

              <Command.Item
                value="new-task"
                onSelect={() => runCommand(() => openModal(ModalType.CREATE_TASK, { columnId: null }))}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <ActionIcons.add className="h-4 w-4" />
                <span>{t('tasks.newTask')}</span>
                <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                  T
                </kbd>
              </Command.Item>
            </Command.Group>

            {/* Navigation */}
            <Command.Group heading={t('commandPalette.navigation')}>
              <Command.Item
                value="dashboard"
                onSelect={() => navigate('/dashboard')}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <NavIcons.dashboard className="h-4 w-4" />
                <span>{t('navigation.dashboard')}</span>
              </Command.Item>

              <Command.Item
                value="projects"
                onSelect={() => navigate('/projects')}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <NavIcons.projects className="h-4 w-4" />
                <span>{t('navigation.projects')}</span>
              </Command.Item>

              <Command.Item
                value="tasks"
                onSelect={() => navigate('/tasks')}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <NavIcons.tasks className="h-4 w-4" />
                <span>{t('navigation.tasks')}</span>
              </Command.Item>

              <Command.Item
                value="team"
                onSelect={() => navigate('/team')}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <NavIcons.team className="h-4 w-4" />
                <span>{t('navigation.team')}</span>
              </Command.Item>

              <Command.Item
                value="settings"
                onSelect={() => navigate('/settings')}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <NavIcons.settings className="h-4 w-4" />
                <span>{t('navigation.settings')}</span>
              </Command.Item>
            </Command.Group>

            {/* Projects */}
            {projects.length > 0 && (
              <Command.Group heading={t('commandPalette.projects')}>
                {projects
                  .filter((p) => !p.isArchived)
                  .slice(0, 5)
                  .map((project) => (
                    <Command.Item
                      key={project.id}
                      value={`project-${project.name}`}
                      onSelect={() => navigate(`/projects/${project.id}`)}
                      className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
                    >
                      <DynamicProjectIcon
                        name={project.icon}
                        className="h-4 w-4"
                        style={{ color: project.color }}
                      />
                      <span>{project.name}</span>
                      {project.isFavorite && (
                        <ActionIcons.favorite className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-auto" />
                      )}
                    </Command.Item>
                  ))}
              </Command.Group>
            )}

            {/* Theme */}
            <Command.Group heading={t('commandPalette.theme')}>
              <Command.Item
                value="theme-light"
                onSelect={() => runCommand(() => setTheme('light'))}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <ThemeIcons.light className="h-4 w-4" />
                <span>{t('settings.themes.light')}</span>
                {theme === 'light' && (
                  <UIIcons.check className="h-4 w-4 ml-auto text-primary" />
                )}
              </Command.Item>

              <Command.Item
                value="theme-dark"
                onSelect={() => runCommand(() => setTheme('dark'))}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <ThemeIcons.dark className="h-4 w-4" />
                <span>{t('settings.themes.dark')}</span>
                {theme === 'dark' && (
                  <UIIcons.check className="h-4 w-4 ml-auto text-primary" />
                )}
              </Command.Item>

              <Command.Item
                value="theme-system"
                onSelect={() => runCommand(() => setTheme('system'))}
                className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
              >
                <ThemeIcons.system className="h-4 w-4" />
                <span>{t('settings.themes.system')}</span>
                {theme === 'system' && (
                  <UIIcons.check className="h-4 w-4 ml-auto text-primary" />
                )}
              </Command.Item>
            </Command.Group>

            {/* User Actions */}
            {user && (
              <Command.Group heading={t('commandPalette.account')}>
                <Command.Item
                  value="profile"
                  onSelect={() => navigate('/settings')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent"
                >
                  <AuthIcons.user className="h-4 w-4" />
                  <span>{t('settings.profile')}</span>
                </Command.Item>

                <Command.Item
                  value="logout"
                  onSelect={() => runCommand(() => logout())}
                  className="flex items-center gap-2 rounded-md px-2 py-2 cursor-pointer aria-selected:bg-accent text-destructive"
                >
                  <AuthIcons.logout className="h-4 w-4" />
                  <span>{t('auth.logout')}</span>
                </Command.Item>
              </Command.Group>
            )}
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">↑↓</kbd>
              <span>{t('commandPalette.navigate')}</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">↵</kbd>
              <span>{t('commandPalette.select')}</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">esc</kbd>
              <span>{t('commandPalette.close')}</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}