'use client'

import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DynamicProjectIcon } from '../ui/dynamic-icon'

interface SidebarProjectItemProps {
  project: Project
  collapsed?: boolean
}

export function SidebarProjectItem({
  project,
  collapsed = false,
}: SidebarProjectItemProps) {
  const pathname = usePathname()
  const locale = useLocale()
  
  const href = `/${locale}/projects/${project.id}`
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-muted-foreground',
        collapsed && 'justify-center px-2'
      )}
      title={collapsed ? project.name : undefined}
    >
      <DynamicProjectIcon
        name={project.icon}
        className="h-4 w-4 shrink-0"
        style={{ color: project.color }}
      />
      {!collapsed && (
        <span className="truncate">{project.name}</span>
      )}
    </Link>
  )
}