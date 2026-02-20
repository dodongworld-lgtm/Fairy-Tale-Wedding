import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../index'

describe('E2E: 전체 프로젝트 생성 플로우', () => {
  const userId = 'e2e-test-user'
  let projectId: string

  it('1. 프로젝트 생성', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('x-user-id', userId)
      .send({
        coupleInfo: { person1: '테스트', person2: '유저', firstMeetDate: '2024-01-01', firstMeetPlace: '테스트 장소', memories: [], proposeMessage: '테스트 메시지' },
        styleOptions: { mood: 'fantasy', background: 'castle', narratorGender: 'female', language: 'ko' }
      })
    expect(res.status).toBe(201)
    projectId = res.body.id
  })

  it('2. 프로젝트 조회', async () => {
    const res = await request(app)
      .get(`/api/projects/${projectId}`)
      .set('x-user-id', userId)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(projectId)
  })

  it('3. 없는 프로젝트 조회 시 404', async () => {
    const res = await request(app)
      .get('/api/projects/nonexistent')
      .set('x-user-id', userId)
    expect(res.status).toBe(404)
  })
})
