import {
  AlertCircle,
  AlertTriangle,
  Archive,
  ArchiveRestore,
  Book,
  Bookmark,
  Briefcase,
  // Misc
  Calendar,
  Camera,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,

  // Status & Priority
  Circle,
  CircleCheck,
  CircleDot,
  CircleX,
  Clock,
  Code,
  Copy,
  Filter,
  Flag,
  // Project icons (pour le sélecteur d'icônes)
  Folder,
  FolderKanban,
  Globe,
  GripVertical,
  Heart,
  Home,
  // i18n
  Languages,
  // Navigation
  LayoutDashboard,
  Lightbulb,
  Link,
  Loader2,
  // Auth
  LogIn,
  LogOut,
  Menu,
  MessageSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Music,
  Palette,
  Paperclip,
  Pencil,
  // Actions
  Plus,
  Rocket,
  Search,
  Settings,
  Star,
  // Theme & UI
  Sun,
  Target,
  Trash2,
  User,
  UserPlus,
  Users,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

// ============================================
// NAVIGATION ICONS
// ============================================

export const NavIcons = {
  dashboard: LayoutDashboard,
  projects: FolderKanban,
  tasks: CheckSquare,
  team: Users,
  settings: Settings,
} as const

// ============================================
// ACTION ICONS
// ============================================

export const ActionIcons = {
  add: Plus,
  edit: Pencil,
  delete: Trash2,
  archive: Archive,
  unarchive: ArchiveRestore,
  favorite: Star,
  search: Search,
  filter: Filter,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
} as const

// ============================================
// AUTH ICONS
// ============================================

export const AuthIcons = {
  login: LogIn,
  logout: LogOut,
  user: User,
  register: UserPlus,
} as const

// ============================================
// THEME ICONS
// ============================================

export const ThemeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const

// ============================================
// UI ICONS
// ============================================

export const UIIcons = {
  menu: Menu,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  loader: Loader2,
  grip: GripVertical,
  check: Check,
  copy: Copy,
  link: Link,
  languages: Languages,
} as const

// ============================================
// STATUS ICONS
// ============================================

export const StatusIcons = {
  todo: Circle,
  inProgress: CircleDot,
  inReview: Clock,
  done: CircleCheck,
  cancelled: CircleX,
} as const

// ============================================
// PRIORITY ICONS
// ============================================

export const PriorityIcons = {
  low: ChevronDown,
  medium: ChevronRight,
  high: ChevronUp,
  urgent: AlertTriangle,
} as const

// ============================================
// PROJECT ICONS (pour le sélecteur)
// ============================================

export const ProjectIcons = {
  folder: Folder,
  rocket: Rocket,
  lightbulb: Lightbulb,
  target: Target,
  briefcase: Briefcase,
  code: Code,
  palette: Palette,
  music: Music,
  camera: Camera,
  heart: Heart,
  zap: Zap,
  globe: Globe,
  book: Book,
  bookmark: Bookmark,
  flag: Flag,
  home: Home,
} as const


export type ProjectIconName = keyof typeof ProjectIcons

// ============================================
// MISC ICONS
// ============================================

export const MiscIcons = {
  calendar: Calendar,
  comment: MessageSquare,
  attachment: Paperclip,
  alert: AlertCircle,
} as const


// ============================================
// HELPER FUNCTION
// ============================================

export function getProjectIcon(iconName: string): LucideIcon {
  return ProjectIcons[iconName as ProjectIconName] || ProjectIcons.folder
}

// Export du type pour typage
export type { LucideIcon }

