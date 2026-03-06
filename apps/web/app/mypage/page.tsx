'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LangSwitcher } from '../components/LangSwitcher'
import { useLang } from '../contexts/LangContext'

// Mock user data — replace with real auth session later
const MOCK_USER = {
  name: '홍길동',
  email: 'user@example.com',
  provider: 'google' as 'google' | 'kakao' | 'email',
  createdAt: '2024.12.01',
  totalProjects: 3,
  paidOrders: 2,
}

type TabKey = 'profile' | 'orders' | 'account'

// Mock orders
const MOCK_ORDERS = [
  { id: 'ord-1', projectName: '지훈 & 수연', plan: 'Pro', price: '$199', date: '2024.12.15', status: '완료' },
  { id: 'ord-2', projectName: '민준 & 서연', plan: 'Standard', price: '$49', date: '2024.12.01', status: '완료' },
]

export default function MyPage() {
  const { t } = useLang()
  const [tab, setTab] = useState<TabKey>('profile')
  const [name, setName] = useState(MOCK_USER.name)
  const [email, setEmail] = useState(MOCK_USER.email)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'profile', label: t.mypage.tabProfile },
    { key: 'orders', label: t.mypage.tabOrders },
    { key: 'account', label: t.mypage.tabAccount },
  ]

  const handleSaveProfile = () => {
    // TODO: API call to update profile
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const providerLabel =
    MOCK_USER.provider === 'google'
      ? t.mypage.googleLogin
      : MOCK_USER.provider === 'kakao'
      ? t.mypage.kakaoLogin
      : t.mypage.emailLogin

  return (
    <div className="min-h-screen bg-bg-subtle">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="text-base font-semibold text-text">Once Upon Us</Link>
            <span className="text-text-muted">/</span>
            <span className="text-sm text-text-secondary">{t.mypage.header}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text transition-colors px-2">
              {t.mypage.myProjects}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

        {/* Profile top */}
        <div className="bg-bg-card rounded-2xl border border-border p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-black flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-text">{name}</h1>
            <p className="text-sm text-text-secondary mt-0.5">{email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                MOCK_USER.provider === 'google'
                  ? 'bg-primary-light/20 text-primary-dark'
                  : MOCK_USER.provider === 'kakao'
                  ? 'bg-primary-light/20 text-primary-dark'
                  : 'bg-bg-subtle text-text-secondary'
              }`}>
                {MOCK_USER.provider === 'google' && (
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {MOCK_USER.provider === 'kakao' && (
                  <span className="font-black text-xs">K</span>
                )}
                {providerLabel}
              </span>
              <span className="text-xs text-text-muted">{MOCK_USER.createdAt} {t.mypage.joined}</span>
            </div>
          </div>
          <div className="flex sm:flex-col gap-4 sm:gap-1 text-center">
            <div>
              <p className="text-xl font-black text-text">{MOCK_USER.totalProjects}</p>
              <p className="text-xs text-text-muted">{t.mypage.totalProjects}</p>
            </div>
            <div className="w-px sm:w-auto sm:h-px bg-border self-stretch sm:self-auto" />
            <div>
              <p className="text-xl font-black text-primary">{MOCK_USER.paidOrders}</p>
              <p className="text-xs text-text-muted">{t.mypage.completedVideos}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-bg-subtle p-1 rounded-xl mb-6">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                tab === t.key
                  ? 'bg-bg-card text-text shadow-sm'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'profile' && (
          <div className="bg-bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-text">{t.mypage.editProfile}</h2>

            <div>
              <label className="text-sm font-medium text-text block mb-1.5">{t.mypage.name}</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm transition-shadow"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text block mb-1.5">{t.mypage.email}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm transition-shadow"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.mypage.save}
              </button>
              {saved && (
                <span className="text-sm text-success font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t.mypage.saved}
                </span>
              )}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-3">
            {MOCK_ORDERS.length === 0 ? (
              <div className="bg-bg-card rounded-2xl border border-border p-12 text-center">
                <p className="text-text-secondary text-sm">{t.mypage.noOrders}</p>
              </div>
            ) : (
              MOCK_ORDERS.map(order => (
                <div key={order.id} className="bg-bg-card rounded-2xl border border-border p-5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text text-sm truncate">{order.projectName}</p>
                    <p className="text-xs text-text-muted mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-primary-light/30 text-primary rounded-full">{order.plan}</span>
                    <p className="font-black text-text text-base mt-1">{order.price}</p>
                  </div>
                  <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full flex-shrink-0">{t.mypage.orderComplete}</span>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'account' && (
          <div className="space-y-4">
            {/* Password change (email users only) */}
            {MOCK_USER.provider === 'email' && (
              <div className="bg-bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-4">
                <h2 className="text-base font-bold text-text">{t.mypage.changePassword}</h2>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">{t.mypage.currentPassword}</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-text block mb-1.5">{t.mypage.newPassword}</label>
                  <input type="password" placeholder={t.mypage.passwordHint} className="w-full px-4 py-3 rounded-xl border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-border-hover text-sm" />
                </div>
                <button className="px-6 py-2.5 bg-dark-bg hover:bg-dark-bg/60 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer">
                  {t.mypage.changePasswordBtn}
                </button>
              </div>
            )}

            {/* Linked accounts */}
            <div className="bg-bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-base font-bold text-text mb-4">{t.mypage.linkedAccounts}</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-sm font-medium text-text">Google</span>
                  </div>
                  {MOCK_USER.provider === 'google' ? (
                    <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">{t.mypage.connected}</span>
                  ) : (
                    <button className="text-xs font-semibold text-primary hover:text-primary-dark cursor-pointer">{t.mypage.connect}</button>
                  )}
                </div>
                <div className="border-t border-border" />
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary-light rounded flex items-center justify-center">
                      <span className="text-black text-xs font-black leading-none">K</span>
                    </div>
                    <span className="text-sm font-medium text-text">Kakao</span>
                  </div>
                  {MOCK_USER.provider === 'kakao' ? (
                    <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">{t.mypage.connected}</span>
                  ) : (
                    <button className="text-xs font-semibold text-primary hover:text-primary-dark cursor-pointer">{t.mypage.connect}</button>
                  )}
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text">{t.mypage.logout}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t.mypage.logoutDesc}</p>
                </div>
                <button
                  onClick={() => { window.location.href = '/login' }}
                  className="px-4 py-2 border border-border text-text text-sm font-medium rounded-lg hover:bg-bg-subtle transition-colors cursor-pointer"
                >
                  {t.mypage.logoutBtn}
                </button>
              </div>
            </div>

            {/* Delete account */}
            <div className="bg-bg-card rounded-2xl border border-error/15 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-error">{t.mypage.deleteAccount}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t.mypage.deleteAccountDesc}</p>
                </div>
                {deleteConfirm ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirm(false)}
                      className="px-3 py-2 border border-border text-text-secondary text-xs font-medium rounded-lg hover:bg-bg-subtle cursor-pointer"
                    >
                      {t.mypage.cancel}
                    </button>
                    <button className="px-3 py-2 bg-error text-white text-xs font-semibold rounded-lg hover:bg-error/90 cursor-pointer">
                      {t.mypage.confirmDelete}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="px-4 py-2 border border-error/15 text-error text-sm font-medium rounded-lg hover:bg-error/10 transition-colors cursor-pointer"
                  >
                    {t.mypage.deleteBtn}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
