'use client'

import {
  ProjectIcons,
  type ProjectIconName,
} from '@/lib/icons'
import type { LucideIcon } from 'lucide-react'
import { createElement, memo } from 'react'

// Map explicite pour que le bundler inclue toutes les icônes (évite le tree-shaking)
const ICON_MAP: Record<ProjectIconName, LucideIcon> = {
  folder: ProjectIcons.folder,
  rocket: ProjectIcons.rocket,
  lightbulb: ProjectIcons.lightbulb,
  target: ProjectIcons.target,
  briefcase: ProjectIcons.briefcase,
  code: ProjectIcons.code,
  palette: ProjectIcons.palette,
  music: ProjectIcons.music,
  camera: ProjectIcons.camera,
  heart: ProjectIcons.heart,
  zap: ProjectIcons.zap,
  globe: ProjectIcons.globe,
  book: ProjectIcons.book,
  bookmark: ProjectIcons.bookmark,
  flag: ProjectIcons.flag,
  home: ProjectIcons.home,
}

interface DynamicProjectIconProps {
  name: string
  className?: string
  style?: React.CSSProperties
}

export const DynamicProjectIcon = memo(function DynamicProjectIcon({
  name,
  className,
  style,
}: DynamicProjectIconProps) {
  const Icon = ICON_MAP[name as ProjectIconName] ?? ProjectIcons.folder
  return createElement(Icon, { className, style })
})