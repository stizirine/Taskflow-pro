export type ServiceMode = 'mock' | 'api'

export const SERVICE_MODE: ServiceMode = 
  (process.env.NEXT_PUBLIC_SERVICE_MODE as ServiceMode) || 'mock'

export const isMockMode = SERVICE_MODE === 'mock'
export const isApiMode = SERVICE_MODE === 'api'

// Délai simulé pour les requêtes mock (en ms)
export const MOCK_DELAY = 500