import type { User } from '@/types'
import { MOCK_DELAY } from '../config'
import type { IAuthService } from '../interfaces'
import type { AuthCredentials, RegisterData, ServiceResponse } from '../types'
import { mockDb } from './data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class AuthMockService implements IAuthService {
  async login(credentials: AuthCredentials): Promise<ServiceResponse<User>> {
    await delay(MOCK_DELAY)
    
    const user = mockDb.getUserByEmail(credentials.email)
    
    if (!user) {
      return {
        success: false,
        error: 'Email ou mot de passe incorrect',
      }
    }
    
    // En mock, on accepte n'importe quel mot de passe
    mockDb.setCurrentUser(user)
    
    return {
      success: true,
      data: user,
    }
  }

  async register(data: RegisterData): Promise<ServiceResponse<User>> {
    await delay(MOCK_DELAY)
    
    const existingUser = mockDb.getUserByEmail(data.email)
    
    if (existingUser) {
      return {
        success: false,
        error: 'Cet email est déjà utilisé',
      }
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      image: null,
      locale: 'fr',
    }
    
    mockDb.addUser(newUser)
    mockDb.setCurrentUser(newUser)
    
    return {
      success: true,
      data: newUser,
    }
  }

  async logout(): Promise<ServiceResponse<void>> {
    await delay(MOCK_DELAY / 2)
    mockDb.setCurrentUser(null)
    
    return {
      success: true,
    }
  }

  async getCurrentUser(): Promise<ServiceResponse<User | null>> {
    await delay(MOCK_DELAY / 2)
    
    return {
      success: true,
      data: mockDb.getCurrentUser(),
    }
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<ServiceResponse<User>> {
    await delay(MOCK_DELAY)
    
    const updatedUser = mockDb.updateUser(userId, data)
    
    if (!updatedUser) {
      return {
        success: false,
        error: 'Utilisateur non trouvé',
      }
    }
    
    return {
      success: true,
      data: updatedUser,
    }
  }
}