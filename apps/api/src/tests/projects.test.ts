import { describe, it, expect, afterAll } from 'vitest'
import request from 'supertest'
import app from '../index'
import { prisma } from '../lib/prisma'

const mockUserId = 'test-user-' + Date.now()

afterAll(async () => {
  // Cleanup test data
  await prisma.project.deleteMany({ where: { userId: mockUserId } }).catch(() => {})
  await prisma.$disconnect()
})

describe('POST /api/projects', () => {
  it('creates a project with couple info', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('x-user-id', mockUserId)
      .send({
        coupleInfo: {
          person1: '지훈',
          person2: '수연',
          firstMeetDate: '2022-03-14',
          firstMeetPlace: '홍대 카페',
          memories: ['제주도 여행'],
          proposeMessage: '평생 내 곁에 있어줄래?'
        },
        styleOptions: {
          mood: 'fantasy',
          background: 'castle',
          narratorGender: 'female',
          language: 'ko'
        }
      })

    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.status).toBe('DRAFT')
  })

  it('returns 401 when x-user-id header is missing', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ coupleInfo: {}, styleOptions: {} })

    expect(res.status).toBe(401)
  })
})

describe('GET /api/projects/:id', () => {
  it('returns 404 for non-existent project', async () => {
    const res = await request(app)
      .get('/api/projects/00000000-0000-0000-0000-000000000000')
      .set('x-user-id', mockUserId)

    expect(res.status).toBe(404)
  })

  it('returns project with relations when found', async () => {
    // Create first
    const created = await request(app)
      .post('/api/projects')
      .set('x-user-id', mockUserId)
      .send({ coupleInfo: { person1: 'A', person2: 'B' }, styleOptions: {} })

    const res = await request(app)
      .get(`/api/projects/${created.body.id}`)
      .set('x-user-id', mockUserId)

    expect(res.status).toBe(200)
    expect(res.body.photos).toBeDefined()
    expect(res.body.scenes).toBeDefined()
  })
})

describe('PATCH /api/projects/:id', () => {
  it('updates couple info', async () => {
    const created = await request(app)
      .post('/api/projects')
      .set('x-user-id', mockUserId)
      .send({ coupleInfo: { person1: 'A' }, styleOptions: {} })

    const res = await request(app)
      .patch(`/api/projects/${created.body.id}`)
      .set('x-user-id', mockUserId)
      .send({ coupleInfo: { person1: 'Updated' }, styleOptions: { mood: 'romantic' } })

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })
})
