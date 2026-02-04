'use client'

import { Input } from '@/components/ui/input'
import { ActionIcons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const t = useTranslations('common')
  const SearchIcon = ActionIcons.search

  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('search')}
        className="pl-9 w-full md:w-[300px] lg:w-[400px]"
      />
    </div>
  )
}