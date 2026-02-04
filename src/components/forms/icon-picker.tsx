'use client'

import { ProjectIcons, type ProjectIconName } from '@/lib/icons'
import { cn } from '@/lib/utils'

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
  color?: string
}

export function IconPicker({ value, onChange, color = '#6366f1' }: IconPickerProps) {
  const iconNames = Object.keys(ProjectIcons) as ProjectIconName[]

  return (
    <div className="grid grid-cols-8 gap-2">
      {iconNames.map((iconName) => {
        const Icon = ProjectIcons[iconName]
        return (
          <button
            key={iconName}
            type="button"
            className={cn(
              'h-10 w-10 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110',
              value === iconName
                ? 'border-foreground bg-accent'
                : 'border-transparent hover:bg-accent/50'
            )}
            onClick={() => onChange(iconName)}
          >
            <Icon className="h-5 w-5" style={{ color: value === iconName ? color : undefined }} />
          </button>
        )
      })}
    </div>
  )
}