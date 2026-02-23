'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { LangSwitcher } from '../components/LangSwitcher'
import { useLang } from '../contexts/LangContext'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

type Project = {
  id: string
  coupleInfo: { person1: string; person2: string }
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  createdAt: string
}

const BG_COLORS = [
  'from-violet-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-teal-500 to-cyan-600',
  'from-purple-500 to-blue-600',
  'from-emerald-500 to-green-600',
]

export default function DashboardPage() {
  const { t } = useLang()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: 실제 사용자 ID 기반 프로젝트 조회 API 연동
    axios.get(`${API}/api/projects`, { headers: { 'x-user-id': 'temp-user' } })
      .then(r => setProjects(r.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const getStatusInfo = (status: Project['status']): { label: string; color: string } => {
    switch (status) {
      case 'PENDING':
        return { label: t.dashboard.statusWaiting, color: 'text-gray-500 bg-gray-100' }
      case 'PROCESSING':
        return { label: t.dashboard.statusGenerating, color: 'text-indigo-600 bg-indigo-50' }
      case 'COMPLETED':
        return { label: t.dashboard.statusDone, color: 'text-green-700 bg-green-50' }
      case 'FAILED':
        return { label: t.dashboard.statusFailed, color: 'text-red-600 bg-red-50' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-base font-semibold text-gray-900">{t.common.brand}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">{t.dashboard.header}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitcher />
            <Link
              href="/create"
              className="px-3 sm:px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.dashboard.newVideo}</span>
              <span className="sm:hidden">{t.dashboard.newVideoShort}</span>
            </Link>
            <Link
              href="/mypage"
              className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
              title={t.dashboard.mypage}
            >
              {t.dashboard.mypage.charAt(0)}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t.dashboard.title}</h1>
          <p className="text-gray-500 text-sm">{t.dashboard.subtitle}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.dashboard.empty}</h3>
            <p className="text-gray-500 text-sm mb-6">{t.dashboard.emptyDesc}</p>
            <Link
              href="/create"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              {t.dashboard.emptyBtn}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project, idx) => {
              const statusInfo = getStatusInfo(project.status)
              const bg = BG_COLORS[idx % BG_COLORS.length]
              const names = project.coupleInfo
                ? `${project.coupleInfo.person1} & ${project.coupleInfo.person2}`
                : t.dashboard.noName
              const date = new Date(project.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })

              return (
                <div key={project.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  {/* Thumbnail */}
                  <div className={`w-full aspect-video bg-gradient-to-br ${bg} flex items-center justify-center`}>
                    {project.status === 'COMPLETED' ? (
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    ) : project.status === 'PROCESSING' ? (
                      <div className="w-8 h-8 border-3 border-white/60 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{names}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">{date}</p>

                    <div className="flex gap-2">
                      {project.status === 'COMPLETED' && (
                        <>
                          <Link
                            href={`/projects/${project.id}/edit`}
                            className="flex-1 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                          >
                            {t.dashboard.editBtn}
                          </Link>
                          <Link
                            href={`/projects/${project.id}/checkout`}
                            className="flex-1 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors text-center"
                          >
                            {t.dashboard.downloadBtn}
                          </Link>
                        </>
                      )}
                      {project.status === 'PROCESSING' && (
                        <Link
                          href={`/projects/${project.id}/generating`}
                          className="flex-1 py-2 border border-indigo-200 text-indigo-600 text-xs font-medium rounded-lg hover:bg-indigo-50 transition-colors text-center"
                        >
                          {t.dashboard.viewProgress}
                        </Link>
                      )}
                      {project.status === 'PENDING' && (
                        <Link
                          href={`/create`}
                          className="flex-1 py-2 border border-gray-200 text-gray-500 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                        >
                          {t.dashboard.continueBtn}
                        </Link>
                      )}
                      {project.status === 'FAILED' && (
                        <button className="flex-1 py-2 border border-red-200 text-red-500 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                          {t.dashboard.retryBtn}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* New project card */}
            <Link
              href="/create"
              className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer group min-h-48"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-200 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600 transition-colors">{t.dashboard.newCard}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
