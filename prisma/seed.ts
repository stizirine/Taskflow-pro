import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'

// dotenv-cli charge .env.local ; en Prisma 7 un adapter ou accelerateUrl est requis
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined. Vérifiez votre fichier .env.local.')
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Créer un utilisateur de test
  const hashedPassword = await hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      locale: 'fr',
    },
  })

  console.log('✅ User created:', user.email)

  // Créer un projet de test
  const project = await prisma.project.upsert({
    where: { id: 'project-seed-1' },
    update: {},
    create: {
      id: 'project-seed-1',
      name: 'TaskFlow Pro',
      description: 'Application de gestion de projets',
      color: '#6366f1',
      icon: 'rocket',
      ownerId: user.id,
    },
  })

  console.log('✅ Project created:', project.name)

  // Créer un board avec des colonnes
  const board = await prisma.board.upsert({
    where: { id: 'board-seed-1' },
    update: {},
    create: {
      id: 'board-seed-1',
      name: 'Board principal',
      projectId: project.id,
    },
  })

  // Créer les colonnes
  const columns = await Promise.all([
    prisma.column.upsert({
      where: { id: 'col-seed-1' },
      update: {},
      create: {
        id: 'col-seed-1',
        name: 'À faire',
        position: 0,
        color: '#6b7280',
        boardId: board.id,
      },
    }),
    prisma.column.upsert({
      where: { id: 'col-seed-2' },
      update: {},
      create: {
        id: 'col-seed-2',
        name: 'En cours',
        position: 1,
        color: '#3b82f6',
        boardId: board.id,
      },
    }),
    prisma.column.upsert({
      where: { id: 'col-seed-3' },
      update: {},
      create: {
        id: 'col-seed-3',
        name: 'Terminé',
        position: 2,
        color: '#10b981',
        boardId: board.id,
      },
    }),
  ])

  console.log('✅ Columns created:', columns.length)

  // Créer quelques tâches
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: 'task-seed-1' },
      update: {},
      create: {
        id: 'task-seed-1',
        title: 'Configurer Next.js',
        description: 'Installer et configurer le projet',
        position: 0,
        priority: 'HIGH',
        status: 'TODO',
        columnId: columns[0].id,
      },
    }),
    prisma.task.upsert({
      where: { id: 'task-seed-2' },
      update: {},
      create: {
        id: 'task-seed-2',
        title: 'Créer les composants',
        position: 1,
        priority: 'MEDIUM',
        status: 'TODO',
        columnId: columns[0].id,
      },
    }),
    prisma.task.upsert({
      where: { id: 'task-seed-3' },
      update: {},
      create: {
        id: 'task-seed-3',
        title: 'Implémenter le Kanban',
        position: 0,
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        columnId: columns[1].id,
      },
    }),
  ])

  console.log('✅ Tasks created:', tasks.length)
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })