'use client'

import { ProjectCard } from '@/components/cards/project-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useProjectService } from '@/hooks/use-services'
import { ActionIcons, NavIcons } from '@/lib/icons'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType } from '@/types'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

export default function DashboardPage() {
  const t = useTranslations()
  const { user, isLoading: isAuthLoading } = useAuth()
  const { projects, setProjects } = useProjectStore()
  const { openModal } = useUIStore()
  const projectService = useProjectService()
  
  const [isLoading, setIsLoading] = useState(true)

  const activeProjects = useMemo(
    () => projects.filter((p) => !p.isArchived),
    [projects]
  )

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true)
      const result = await projectService.getAll({ isArchived: false })
      if (result.success && result.data) {
        setProjects(result.data)
      }
      setIsLoading(false)
    }
    
    loadProjects()
  }, [projectService, setProjects])

  const PlusIcon = ActionIcons.add
  const DashboardIcon = NavIcons.dashboard
  const ProjectsIcon = NavIcons.projects
  const TasksIcon = NavIcons.tasks

  const stats = [
    {
      title: t('dashboard.totalProjects'),
      value: activeProjects.length,
      icon: ProjectsIcon,
      color: 'text-blue-500',
    },
    {
      title: t('dashboard.totalTasks'),
      value: 0,
      icon: TasksIcon,
      color: 'text-green-500',
    },
    {
      title: t('dashboard.completedTasks'),
      value: 0,
      icon: TasksIcon,
      color: 'text-purple-500',
    },
    {
      title: t('dashboard.pendingTasks'),
      value: 0,
      icon: TasksIcon,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DashboardIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
            {isAuthLoading ? (
              <Skeleton className="h-5 w-48 mt-1" />
            ) : (
              <p className="text-muted-foreground">
                {user
                  ? t('dashboard.welcome', { name: user.name ?? user.email ?? 'Guest'})
                  : t('auth.notConnected')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('dashboard.recentProjects')}</CardTitle>
              <CardDescription>
                {t('projects.projectCount', { count: activeProjects.length })}
              </CardDescription>
            </div>
            <Button onClick={() => openModal(ModalType.CREATE_PROJECT)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              {t('projects.newProject')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-6 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : activeProjects.length === 0 ? (
            <div className="text-center py-12">
              <ProjectsIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                {t('projects.noProjects')}
              </p>
              <Button onClick={() => openModal(ModalType.CREATE_PROJECT)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                {t('projects.newProject')}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}