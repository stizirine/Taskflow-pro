'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ActionIcons, PriorityIcons, StatusIcons, UIIcons } from '@/lib/icons'
import { Priority, TaskStatus, type Project } from '@/types'
import type { TaskFilters as TaskFiltersType } from '@/types/filters'
import { useTranslations } from 'next-intl'

interface TaskFiltersProps {
  filters: TaskFiltersType
  onFiltersChange: (filters: TaskFiltersType) => void
  projects: Project[]
}

export function TaskFilters({ filters, onFiltersChange, projects }: TaskFiltersProps) {
  const t = useTranslations()

  const SearchIcon = ActionIcons.search
  const ClearIcon = UIIcons.close

  const hasActiveFilters = 
    filters.search || 
    (filters.status && filters.status !== 'all') || 
    (filters.priority && filters.priority !== 'all') ||
    (filters.projectId && filters.projectId !== 'all')

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('common.search')}
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => onFiltersChange({ ...filters, status: value as TaskStatus | 'all' })}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t('tasks.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.all')}</SelectItem>
            <SelectItem value={TaskStatus.TODO}>
              <div className="flex items-center gap-2">
                <StatusIcons.todo className="h-4 w-4" />
                {t('tasks.statuses.todo')}
              </div>
            </SelectItem>
            <SelectItem value={TaskStatus.IN_PROGRESS}>
              <div className="flex items-center gap-2">
                <StatusIcons.inProgress className="h-4 w-4" />
                {t('tasks.statuses.inProgress')}
              </div>
            </SelectItem>
            <SelectItem value={TaskStatus.IN_REVIEW}>
              <div className="flex items-center gap-2">
                <StatusIcons.inReview className="h-4 w-4" />
                {t('tasks.statuses.inReview')}
              </div>
            </SelectItem>
            <SelectItem value={TaskStatus.DONE}>
              <div className="flex items-center gap-2">
                <StatusIcons.done className="h-4 w-4" />
                {t('tasks.statuses.done')}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select
          value={filters.priority || 'all'}
          onValueChange={(value) => onFiltersChange({ ...filters, priority: value as Priority | 'all' })}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t('tasks.priority')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.all')}</SelectItem>
            <SelectItem value={Priority.LOW}>
              <div className="flex items-center gap-2">
                <PriorityIcons.low className="h-4 w-4" />
                {t('tasks.priorities.low')}
              </div>
            </SelectItem>
            <SelectItem value={Priority.MEDIUM}>
              <div className="flex items-center gap-2">
                <PriorityIcons.medium className="h-4 w-4" />
                {t('tasks.priorities.medium')}
              </div>
            </SelectItem>
            <SelectItem value={Priority.HIGH}>
              <div className="flex items-center gap-2">
                <PriorityIcons.high className="h-4 w-4" />
                {t('tasks.priorities.high')}
              </div>
            </SelectItem>
            <SelectItem value={Priority.URGENT}>
              <div className="flex items-center gap-2">
                <PriorityIcons.urgent className="h-4 w-4" />
                {t('tasks.priorities.urgent')}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Project Filter */}
        <Select
          value={filters.projectId || 'all'}
          onValueChange={(value) => onFiltersChange({ ...filters, projectId: value })}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t('projects.title')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('projects.allProjects')}</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">{t('tasks.activeFilters')}:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              {t('common.search')}: {filters.search}
              <button onClick={() => onFiltersChange({ ...filters, search: undefined })}>
                <ClearIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.status && filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {t('tasks.status')}: {t(`tasks.statuses.${filters.status.toLowerCase()}`)}
              <button onClick={() => onFiltersChange({ ...filters, status: 'all' })}>
                <ClearIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.priority && filters.priority !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {t('tasks.priority')}: {t(`tasks.priorities.${filters.priority.toLowerCase()}`)}
              <button onClick={() => onFiltersChange({ ...filters, priority: 'all' })}>
                <ClearIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            {t('common.clearAll')}
          </Button>
        </div>
      )}
    </div>
  )
}