'use client'

import { TaskFilters } from '@/components/tasks/task-filters'
import { TaskListItem } from '@/components/tasks/task-list-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTasks } from '@/hooks/use-tasks'
import { NavIcons, StatusIcons } from '@/lib/icons'
import { TaskStatus } from '@/types'
import { useTranslations } from 'next-intl'

export default function TasksPage() {
  const t = useTranslations()
  const { tasks, projects, isLoading, filters, setFilters, stats, refresh } = useTasks()
  const TasksIcon = NavIcons.tasks

  // Grouper les tâches par statut
  const todoTasks = tasks.filter((t) => t.status === TaskStatus.TODO)
  const inProgressTasks = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS)
  const doneTasks = tasks.filter((t) => t.status === TaskStatus.DONE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TasksIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('tasks.title')}</h1>
            <p className="text-muted-foreground">
              {t('tasks.allTasks')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.totalTasks')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats.total}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('tasks.statuses.inProgress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.completedTasks')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('tasks.overdue')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-red-500">{stats.overdue}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            projects={projects}
          />
        </CardContent>
      </Card>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            {t('common.all')} ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="todo">
            {t('tasks.statuses.todo')} ({todoTasks.length})
          </TabsTrigger>
          <TabsTrigger value="inProgress">
            {t('tasks.statuses.inProgress')} ({inProgressTasks.length})
          </TabsTrigger>
          <TabsTrigger value="done">
            {t('tasks.statuses.done')} ({doneTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : tasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TasksIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('tasks.noTasks')}</p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <TaskListItem key={task.id} task={task} onUpdate={refresh} />
            ))
          )}
        </TabsContent>

        <TabsContent value="todo" className="mt-6 space-y-3">
          {todoTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <StatusIcons.todo className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('tasks.noTasks')}</p>
              </CardContent>
            </Card>
          ) : (
            todoTasks.map((task) => (
              <TaskListItem key={task.id} task={task} onUpdate={refresh} />
            ))
          )}
        </TabsContent>

        <TabsContent value="inProgress" className="mt-6 space-y-3">
          {inProgressTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <StatusIcons.inProgress className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('tasks.noTasks')}</p>
              </CardContent>
            </Card>
          ) : (
            inProgressTasks.map((task) => (
              <TaskListItem key={task.id} task={task} onUpdate={refresh} />
            ))
          )}
        </TabsContent>

        <TabsContent value="done" className="mt-6 space-y-3">
          {doneTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <StatusIcons.done className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('tasks.noTasks')}</p>
              </CardContent>
            </Card>
          ) : (
            doneTasks.map((task) => (
              <TaskListItem key={task.id} task={task} onUpdate={refresh} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}