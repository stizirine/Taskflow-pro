// ============================================
// ENUMS
// ============================================

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export enum ProjectRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum ModalType {
  CREATE_PROJECT = 'createProject',
  EDIT_PROJECT = 'editProject',
  DELETE_PROJECT = 'deleteProject',
  CREATE_TASK = 'createTask',
  EDIT_TASK = 'editTask',
  DELETE_TASK = 'deleteTask',
  TASK_DETAILS = 'taskDetails',
  INVITE_MEMBER = 'inviteMember',
}

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  locale: string
}

// ============================================
// PROJECT TYPES
// ============================================

export interface Project {
  id: string
  name: string
  description: string | null
  color: string
  icon: string
  isFavorite: boolean
  isArchived: boolean
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectMember {
  id: string
  role: ProjectRole
  userId: string
  projectId: string
  user?: User
}

// ============================================
// BOARD & COLUMN TYPES
// ============================================

export interface Board {
  id: string
  name: string
  projectId: string
  columns: Column[]
}

export interface Column {
  id: string
  name: string
  position: number
  color: string
  boardId: string
  tasks: Task[]
}

// ============================================
// TASK TYPES
// ============================================

export interface Task {
  id: string
  title: string
  description: string | null
  position: number
  priority: Priority
  status: TaskStatus
  dueDate: Date | null
  columnId: string
  assigneeId: string | null
  assignee?: User | null
  parentId: string | null
  subTasks?: Task[]
  comments?: Comment[]
  checklists?: Checklist[]
  createdAt: Date
  updatedAt: Date
}

export interface Checklist {
  id: string
  title: string
  done: boolean
  taskId: string
}

export interface Comment {
  id: string
  content: string
  taskId: string
  authorId: string
  author?: User
  createdAt: Date
  updatedAt: Date
}

// ============================================
// UI TYPES
// ============================================

export interface ModalState {
  isOpen: boolean
  type: ModalType | null
  data?: unknown
}

export interface TeamMember {
  id: string
  userId: string
  user: User
  role: ProjectRole
  joinedAt: Date
}

export interface Invitation {
  id: string
  email: string
  role: ProjectRole
  status: InvitationStatus
  expiresAt: Date
  createdAt: Date
}

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
}