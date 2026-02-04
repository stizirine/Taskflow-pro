'use client'

import { Button } from '@/components/ui/button'
import { ActionIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface CommandTriggerProps {
  className?: string
}

export function CommandTrigger({ className }: CommandTriggerProps) {
  const t = useTranslations()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    const value = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    queueMicrotask(() => setIsMac(value))
  }, [])

  const handleClick = () => {
    // Déclencher le raccourci clavier
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
    })
    document.dispatchEvent(event)
  }

  return (
    <Button
      variant="outline"
      className={cn(
        'relative h-9 w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80',
        className
      )}
      onClick={handleClick}
    >
      <ActionIcons.search className="mr-2 h-4 w-4" />
      <span className="hidden lg:inline-flex">{t('commandPalette.placeholder')}</span>
      <span className="inline-flex lg:hidden">{t('common.search')}</span>
      <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        {isMac ? '⌘' : 'Ctrl'}K
      </kbd>
    </Button>
  )
}