import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../index'

describe('E2E: 전체 프로젝트 생성 플로우', () => {
  const userId = 'e2e-test-user'
  let projectId: string

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('x-user-id', userId)
      .send({
        coupleInfo: {
          person1: '테스트',
          person2: '유저',
          firstMeetDate: '2024-01-01',
          firstMeetPlace: '테스트 장소',
          memories: [],
          proposeMessage: '테스트 메시지'
        },
        styleOptions: {
          mood: 'fantasy',
          background: 'castle',
          narratorGender: 'female',
          language: 'ko'
        }
      })
    expect(res.status).toBe(201)
    projectId = res.body.id
  })

  it('프로젝트가 생성되어 ID가 존재한다', () => {
    expect(projectId).toBeDefined()
  })

  it('프로젝트를 조회하면 200을 반환한다', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}`)
      .set('x-user-id', userId)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(projectId)
  })

  it('존재하지 않는 프로젝트 조회 시 404를 반환한다', async () => {
    const res = await request(app)
      .get('/api/projects/nonexistent')
      .set('x-user-id', userId)
    expect(res.status).toBe(404)
  })
})
