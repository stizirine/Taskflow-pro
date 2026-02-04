import type { User } from '@/types'
import type { IAuthService } from '../interfaces'
import type { AuthCredentials, RegisterData, ServiceResponse } from '../types'

export class AuthApiService implements IAuthService {
  async login(_credentials: AuthCredentials): Promise<ServiceResponse<User>> {
    // TODO: Implémenter avec NextAuth
    throw new Error('Not implemented - use NextAuth signIn')
  }

  async register(data: RegisterData): Promise<ServiceResponse<User>> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.user }
  }

  async logout(): Promise<ServiceResponse<void>> {
    // TODO: Implémenter avec NextAuth signOut
    throw new Error('Not implemented - use NextAuth signOut')
  }

  async getCurrentUser(): Promise<ServiceResponse<User | null>> {
    // TODO: Implémenter avec NextAuth session
    throw new Error('Not implemented - use NextAuth session')
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<ServiceResponse<User>> {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return { success: false, error: result.error }
    }
    
    return { success: true, data: result.user }
  }
}