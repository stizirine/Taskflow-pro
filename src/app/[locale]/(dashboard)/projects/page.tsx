'use client'

import { ProjectCard } from '@/components/cards/project-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ActionIcons, NavIcons } from '@/lib/icons'
import { useProjectStore, useUIStore } from '@/stores'
import { ModalType } from '@/types'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo } from 'react'

export default function ProjectsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const projects = useProjectStore((state) => state.projects)
  const { openModal } = useUIStore()

  const activeProjects = useMemo(
    () => projects.filter((p) => !p.isArchived),
    [projects]
  )

  const archivedProjects = useMemo(
    () => projects.filter((p) => p.isArchived),
    [projects]
  )

  const favoriteProjects = useMemo(
    () => projects.filter((p) => p.isFavorite && !p.isArchived),
    [projects]
  )

  const ProjectsIcon = NavIcons.projects
  const PlusIcon = ActionIcons.add

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProjectsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('projects.title')}</h1>
            <p className="text-muted-foreground">
              {t('projects.projectCount', { count: activeProjects.length })}
            </p>
          </div>
        </div>

        <Button onClick={() => openModal(ModalType.CREATE_PROJECT)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {t('projects.newProject')}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            {t('projects.allProjects')} ({activeProjects.length})
          </TabsTrigger>
          <TabsTrigger value="favorites">
            {t('projects.favorites')} ({favoriteProjects.length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            {t('projects.archived')} ({archivedProjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {activeProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ProjectsIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">{t('projects.noProjects')}</p>
                <Button onClick={() => openModal(ModalType.CREATE_PROJECT)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  {t('projects.newProject')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeProjects.map((project) => (
                <Link key={project.id} href={`/${locale}/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favoriteProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ActionIcons.favorite className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('common.noResults')}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteProjects.map((project) => (
                <Link key={project.id} href={`/${locale}/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          {archivedProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ActionIcons.archive className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('common.noResults')}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {archivedProjects.map((project) => (
                <Link key={project.id} href={`/${locale}/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}