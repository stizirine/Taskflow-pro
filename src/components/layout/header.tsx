'use client'

import { Button } from '@/components/ui/button'
import { NavIcons, UIIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores'
import { useTranslations } from 'next-intl'
import { CommandTrigger } from './command-trigger'
import { LanguageSwitcher } from './language-switcher'
import { ThemeSwitcher } from './theme-switcher'
import { UserMenu } from './user-menu'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const t = useTranslations('common')
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore()

  const MenuIcon = UIIcons.menu
  const LogoIcon = NavIcons.dashboard

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6',
        className
      )}
    >
      {/* Menu toggle + Logo */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className="shrink-0"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <LogoIcon className="h-6 w-6 text-primary" />
          <span className="hidden font-bold md:inline-block">
            {t('appName')}
          </span>
        </div>
      </div>

      {/* Command Palette Trigger - Centered */}
      <div className="flex-1 flex justify-center">
        <CommandTrigger className="max-w-md" />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <UserMenu />
      </div>
    </header>
  )
}