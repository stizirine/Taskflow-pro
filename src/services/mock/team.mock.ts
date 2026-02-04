import { InvitationStatus, ProjectRole, type Invitation, type TeamMember, type User } from '@/types'

/** Données mock des membres d'équipe pour la démo */
export const mockMembers: TeamMember[] = [
  {
    id: '1',
    userId: 'user-1',
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      image: null,
      locale: 'fr',
    } as User,
    role: ProjectRole.OWNER,
    joinedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    userId: 'user-2',
    user: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      image: null,
      locale: 'en',
    } as User,
    role: ProjectRole.ADMIN,
    joinedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    userId: 'user-3',
    user: {
      id: 'user-3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      image: null,
      locale: 'fr',
    } as User,
    role: ProjectRole.MEMBER,
    joinedAt: new Date('2024-02-01'),
  },
]

/** Données mock des invitations en attente pour la démo */
export const mockPendingInvitations: Invitation[] = [
  {
    id: 'inv-1',
    email: 'alice@example.com',
    role: ProjectRole.MEMBER,
    status: InvitationStatus.PENDING,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
]
