'use client'

import { Badge } from '@/components/ui/badge'
import { SERVICE_MODE, isMockMode } from '@/services'

export function ServiceModeIndicator() {
  // Afficher seulement en développement
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge 
        variant={isMockMode ? 'secondary' : 'default'}
        className="text-xs px-3 py-1 shadow-lg"
      >
        🔧 Mode: {SERVICE_MODE.toUpperCase()}
      </Badge>
    </div>
  )
}