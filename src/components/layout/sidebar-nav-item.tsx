'use client'

import type { LucideIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarNavItemProps {
  href: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
}

export function SidebarNavItem({
  href,
  icon: Icon,
  label,
  collapsed = false,
}: SidebarNavItemProps) {
  const pathname = usePathname()
  const locale = useLocale()
  
  const fullHref = `/${locale}${href}`
  const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`)

  return (
    <Link
      href={fullHref}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-muted-foreground',
        collapsed && 'justify-center px-2'
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}