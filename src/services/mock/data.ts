import { Priority, TaskStatus, type Board, type Column, type Project, type User } from '@/types'

// ============================================
// USERS
// ============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    image: null,
    locale: 'fr',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: null,
    locale: 'en',
  },
]

// ============================================
// PROJECTS
// ============================================

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'TaskFlow Pro',
    description: 'Application de gestion de projets et tâches',
    color: '#6366f1',
    icon: 'rocket',
    isFavorite: true,
    isArchived: false,
    ownerId: 'user-1',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: 'project-2',
    name: 'Site E-commerce',
    description: 'Boutique en ligne avec Next.js',
    color: '#10b981',
    icon: 'briefcase',
    isFavorite: false,
    isArchived: false,
    ownerId: 'user-1',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'project-3',
    name: 'App Mobile',
    description: 'Application React Native',
    color: '#f59e0b',
    icon: 'code',
    isFavorite: true,
    isArchived: false,
    ownerId: 'user-1',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-25'),
  },
]

// ============================================
// BOARDS & TASKS
// ============================================

export function createMockBoard(projectId: string): Board {
  const columns: Column[] = [
    {
      id: `${projectId}-col-1`,
      name: 'À faire',
      position: 0,
      color: '#6b7280',
      boardId: `${projectId}-board`,
      tasks: [
        {
          id: `${projectId}-task-1`,
          title: 'Configurer le projet',
          description: 'Installer les dépendances et configurer TypeScript',
          position: 0,
          priority: Priority.HIGH,
          status: TaskStatus.TODO,
          dueDate: new Date('2025-02-10'),
          columnId: `${projectId}-col-1`,
          assigneeId: null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: `${projectId}-task-2`,
          title: 'Créer les composants UI',
          description: 'Utiliser shadcn/ui',
          position: 1,
          priority: Priority.MEDIUM,
          status: TaskStatus.TODO,
          dueDate: null,
          columnId: `${projectId}-col-1`,
          assigneeId: null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: `${projectId}-col-2`,
      name: 'En cours',
      position: 1,
      color: '#3b82f6',
      boardId: `${projectId}-board`,
      tasks: [
        {
          id: `${projectId}-task-3`,
          title: 'Implémenter l\'authentification',
          description: 'NextAuth avec Google et GitHub',
          position: 0,
          priority: Priority.URGENT,
          status: TaskStatus.IN_PROGRESS,
          dueDate: new Date('2025-02-05'),
          columnId: `${projectId}-col-2`,
          assigneeId: null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: `${projectId}-col-3`,
      name: 'En revue',
      position: 2,
      color: '#8b5cf6',
      boardId: `${projectId}-board`,
      tasks: [],
    },
    {
      id: `${projectId}-col-4`,
      name: 'Terminé',
      position: 3,
      color: '#10b981',
      boardId: `${projectId}-board`,
      tasks: [
        {
          id: `${projectId}-task-4`,
          title: 'Setup initial',
          description: 'Repository et structure de base',
          position: 0,
          priority: Priority.LOW,
          status: TaskStatus.DONE,
          dueDate: null,
          columnId: `${projectId}-col-4`,
          assigneeId: null,
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ]

  return {
    id: `${projectId}-board`,
    name: 'Board principal',
    projectId,
    columns,
  }
}

// ============================================
// STORE EN MÉMOIRE (pour simuler une vraie DB)
// ============================================

class MockDatabase {
  private users: User[] = [...mockUsers]
  private projects: Project[] = [...mockProjects]
  private boards: Map<string, Board> = new Map()
  private currentUser: User | null = null

  // Users
  getUsers() { return this.users }
  getUserById(id: string) { return this.users.find(u => u.id === id) }
  getUserByEmail(email: string) { return this.users.find(u => u.email === email) }
  
  setCurrentUser(user: User | null) { this.currentUser = user }
  getCurrentUser() { return this.currentUser }
  
  addUser(user: User) {
    this.users.push(user)
    return user
  }
  
  updateUser(id: string, data: Partial<User>) {
    const index = this.users.findIndex(u => u.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data }
      return this.users[index]
    }
    return null
  }

  // Projects
  getProjects() { return this.projects }
  getProjectById(id: string) { return this.projects.find(p => p.id === id) }
  
  addProject(project: Project) {
    this.projects.push(project)
    return project
  }
  
  updateProject(id: string, data: Partial<Project>) {
    const index = this.projects.findIndex(p => p.id === id)
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...data, updatedAt: new Date() }
      return this.projects[index]
    }
    return null
  }
  
  deleteProject(id: string) {
    const index = this.projects.findIndex(p => p.id === id)
    if (index !== -1) {
      this.projects.splice(index, 1)
      this.boards.delete(id)
      return true
    }
    return false
  }

  // Boards
  getBoard(projectId: string) {
    if (!this.boards.has(projectId)) {
      this.boards.set(projectId, createMockBoard(projectId))
    }
    return this.boards.get(projectId)!
  }
  
  updateBoard(projectId: string, board: Board) {
    this.boards.set(projectId, board)
    return board
  }

  // Reset (utile pour les tests)
  reset() {
    this.users = [...mockUsers]
    this.projects = [...mockProjects]
    this.boards.clear()
    this.currentUser = null
  }
}

// Singleton
export const mockDb = new MockDatabase()