import type { User } from '@/types'
import type { AuthCredentials, RegisterData, ServiceResponse } from '../types'

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<ServiceResponse<User>>
  register(data: RegisterData): Promise<ServiceResponse<User>>
  logout(): Promise<ServiceResponse<void>>
  getCurrentUser(): Promise<ServiceResponse<User | null>>
  updateProfile(userId: string, data: Partial<User>): Promise<ServiceResponse<User>>
}