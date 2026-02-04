'use client'

import { Badge } from '@/components/ui/badge'
import { SERVICE_MODE, isMockMode } from '@/services'

export function ServiceModeIndicator() {
  // Ne pas afficher en production avec mode API
  if (process.env.NODE_ENV === 'production' && !isMockMode) {
    return null
  }

  // En développement, toujours afficher
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge
          variant={isMockMode ? 'secondary' : 'default'}
          className="text-xs px-3 py-1 shadow-lg"
        >
          🔧 {process.env.NODE_ENV.toUpperCase()} | Mode: {SERVICE_MODE.toUpperCase()}
        </Badge>
      </div>
    )
  }

  // En prod avec mock (pour debug), afficher un warning
  if (isMockMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="destructive" className="text-xs px-3 py-1 shadow-lg">
          ⚠️ MOCK MODE - Data not persisted
        </Badge>
      </div>
    )
  }

  return null
}