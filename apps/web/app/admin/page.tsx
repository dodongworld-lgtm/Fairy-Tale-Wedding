'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Project = {
  id: string
  person1?: string
  person2?: string
  coupleInfo?: { person1: string; person2: string }
  status?: string
  createdAt?: string
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'text-success bg-success/10'
    case 'PROCESSING':
      return 'text-primary bg-primary-light/30'
    case 'FAILED':
      return 'text-error bg-error/10'
    default:
      return 'text-text-secondary bg-bg-subtle'
  }
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/projects`, { headers: { 'x-user-id': 'admin' } })
      .then(r => r.json())
      .then(data => setProjects(data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-bg-subtle">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-base font-semibold text-text">동화 웨딩</Link>
            <span className="text-text-muted">/</span>
            <span className="text-sm text-text-secondary">관리자</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text mb-1">관리자 대시보드</h1>
          <p className="text-text-secondary text-sm">전체 프로젝트를 관리합니다</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-2xl">
            <p className="text-text-muted">프로젝트가 없습니다</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => {
              const names = p.coupleInfo
                ? `${p.coupleInfo.person1} & ${p.coupleInfo.person2}`
                : p.person1 && p.person2
                  ? `${p.person1} & ${p.person2}`
                  : '이름 없음'
              const status = p.status || 'PENDING'
              const date = p.createdAt
                ? new Date(p.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''

              return (
                <Link
                  key={p.id}
                  href={`/admin/${p.id}`}
                  className="block bg-bg-card rounded-2xl border border-border p-5 hover:shadow-md hover:border-border-hover transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-text text-sm">{names}</h2>
                      <p className="text-xs text-text-muted mt-1">{date}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusStyle(status)}`}
                    >
                      {status}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
