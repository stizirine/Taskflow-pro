'use client'

import { DeleteProjectModal } from '@/components/modals/delete-project-modal'
import { DeleteTaskModal } from '@/components/modals/delete-task-modal'
import { InviteMemberModal } from '@/components/modals/invite-member-modal'
import { ProjectModal } from '@/components/modals/project-modal'
import { TaskModal } from '@/components/modals/task-modal'

export function ModalProvider() {
  return (
    <>
      <ProjectModal />
      <DeleteProjectModal />
      <TaskModal />
      <DeleteTaskModal />
      <InviteMemberModal />
    </>
  )
}