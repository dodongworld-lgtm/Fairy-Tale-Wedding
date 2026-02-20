import { vi } from 'vitest'

// In-memory store for test projects
const store: Record<string, any> = {}

export const prisma = {
  project: {
    create: vi.fn(async ({ data }: { data: any }) => {
      const id = 'proj-' + Math.random().toString(36).slice(2)
      const project = {
        id,
        status: 'DRAFT',
        createdAt: new Date(),
        completedAt: null,
        ...data
      }
      store[id] = project
      return project
    }),
    findFirst: vi.fn(async ({ where, include }: { where: any; include?: any }) => {
      const project = Object.values(store).find(
        (p: any) => p.id === where.id && p.userId === where.userId
      )
      if (!project) return null
      if (include) {
        return {
          ...project,
          photos: include.photos ? [] : undefined,
          scenes: include.scenes ? [] : undefined,
          videos: include.videos ? [] : undefined
        }
      }
      return project
    }),
    updateMany: vi.fn(async ({ where, data }: { where: any; data: any }) => {
      const project = Object.values(store).find(
        (p: any) => p.id === where.id && p.userId === where.userId
      ) as any
      if (!project) return { count: 0 }
      Object.assign(store[project.id], data)
      return { count: 1 }
    }),
    deleteMany: vi.fn(async () => ({ count: 0 }))
  },
  $disconnect: vi.fn(async () => {})
}
