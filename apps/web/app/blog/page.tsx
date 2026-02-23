'use client'
import Link from 'next/link'
import { LangSwitcher } from '../components/LangSwitcher'
import { useLang } from '../contexts/LangContext'

type PostTag = '결혼식 후기' | '프로포즈 후기' | '이벤트' | '제작 팁'

type Post = {
  id: number
  tag: PostTag
  title: string
  desc: string
  date: string
  readTime: string
  event?: boolean
  thumbnail: {
    bg: string
    label: string
  }
}

const POSTS: Post[] = [
  {
    id: 1,
    tag: '이벤트',
    title: '프로포즈 영상 무료 제작 이벤트 — 프로포즈 과정을 영상으로 찍어 올려주세요',
    desc: '프로포즈하는 순간을 촬영한 영상을 업로드해 주시면, 저희가 AI로 60초 감동 영상을 무료로 만들어 드립니다. 당신의 프로포즈 이야기를 세상과 나눠주세요.',
    date: '2024.12.20',
    readTime: '2분',
    event: true,
    thumbnail: { bg: 'from-indigo-600 to-violet-700', label: '무료 이벤트' },
  },
  {
    id: 2,
    tag: '결혼식 후기',
    title: '하객 200명 앞에서 틀었더니 눈물바다가 됐습니다 — 지훈 & 수연 결혼식 후기',
    desc: '결혼식 피로연 시작 전, 하객들이 자리에 앉을 때 스크린으로 틀었어요. 음악이 흐르고 나레이션이 시작되자마자 어머니들이 먼저 우셨습니다. 신랑도 눈물을 참지 못했고요.',
    date: '2024.12.15',
    readTime: '5분',
    thumbnail: { bg: 'from-rose-500 to-pink-700', label: '결혼식 현장' },
  },
  {
    id: 3,
    tag: '프로포즈 후기',
    title: '한강 야경 앞에서 영상을 틀었을 때 — 민준의 프로포즈 스토리',
    desc: '노트북으로 틀려고 했는데 너무 작을 것 같아서 작은 빔프로젝터를 빌렸어요. 영상이 시작되고 수연이가 자기 이름이 나오자마자 멈춰버렸습니다. "이거 우리 이야기야?"라고 하더니...',
    date: '2024.12.10',
    readTime: '4분',
    thumbnail: { bg: 'from-amber-500 to-orange-700', label: '한강 프로포즈' },
  },
  {
    id: 4,
    tag: '제작 팁',
    title: '더 감동적인 영상을 만드는 5가지 팁 — 기억 입력 가이드',
    desc: '수백 개의 영상을 만들면서 알게 된 것들을 공유합니다. "제주도 여행"보다 "제주도에서 처음으로 손을 잡았던 밤"이 훨씬 더 감동적인 장면을 만들어냅니다.',
    date: '2024.12.05',
    readTime: '3분',
    thumbnail: { bg: 'from-teal-600 to-cyan-800', label: '제작 팁' },
  },
  {
    id: 5,
    tag: '결혼식 후기',
    title: '웨딩홀 측에서 직접 요청이 왔습니다 — 성현 & 유진 결혼식 이야기',
    desc: '결혼식이 끝나고 웨딩홀 매니저분이 와서 "영상 어디서 만드셨냐"고 물으셨어요. 하객들 반응이 너무 좋았다고 하셨고, 앞으로 다른 예비부부들한테도 소개해주고 싶다고 하셨습니다.',
    date: '2024.11.28',
    readTime: '6분',
    thumbnail: { bg: 'from-purple-600 to-blue-800', label: '웨딩홀 후기' },
  },
  {
    id: 6,
    tag: '프로포즈 후기',
    title: '서울 N타워에서의 프로포즈 — 현우의 작전',
    desc: '남산 N타워 전망대에서 미리 태블릿을 숨겨놨어요. 야경 보러 가자고 데려간 다음, 자리에 앉자마자 영상을 틀었습니다. "이거 직접 만들었어?" 물어보는데 어떻게 대답해야 할지...',
    date: '2024.11.20',
    readTime: '4분',
    thumbnail: { bg: 'from-emerald-600 to-green-800', label: 'N타워 프로포즈' },
  },
  {
    id: 7,
    tag: '이벤트',
    title: '결혼식에서 틀어주신 분들께 — 촬영 영상 공유 이벤트',
    desc: '결혼식에서 Once Upon Us 영상을 틀어주신 분 중, 하객들의 반응을 촬영한 영상을 공유해 주시면 다음 영상을 무료로 제작해 드립니다. (친구 프로포즈용 등)',
    date: '2024.11.15',
    readTime: '2분',
    event: true,
    thumbnail: { bg: 'from-violet-600 to-indigo-900', label: '공유 이벤트' },
  },
  {
    id: 8,
    tag: '제작 팁',
    title: '어떤 기기로 틀어야 가장 예쁘게 보일까? — 상황별 재생 가이드',
    desc: '야외 프로포즈라면 빔프로젝터, 실내라면 TV나 대형 모니터가 가장 좋습니다. 결혼식장 스크린은 웨딩홀에 미리 HDMI 연결 가능 여부를 확인하세요.',
    date: '2024.11.08',
    readTime: '3분',
    thumbnail: { bg: 'from-gray-600 to-gray-800', label: '재생 가이드' },
  },
]

const TAG_COLORS: Record<PostTag, string> = {
  '결혼식 후기': 'bg-rose-50 text-rose-600',
  '프로포즈 후기': 'bg-amber-50 text-amber-700',
  '이벤트': 'bg-indigo-50 text-indigo-600',
  '제작 팁': 'bg-teal-50 text-teal-700',
}

export default function BlogPage() {
  const { t } = useLang()
  const featuredPost = POSTS[0]
  const eventPosts = POSTS.filter(p => p.event)
  const regularPosts = POSTS.filter(p => !p.event)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-40">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-base font-semibold text-gray-900">Once Upon Us</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">{t.blog.header}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Link
              href="/create"
              className="px-3 sm:px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors"
            >
              {t.common.createVideo}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.blog.title}</h1>
          <p className="text-gray-500">{t.blog.subtitle}</p>
        </div>

        {/* Event Banner */}
        <div className="mb-10 bg-indigo-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-200 mb-2 block">{t.blog.currentEvent}</span>
            <h2 className="text-xl font-bold mb-1">프로포즈 영상 무료 제작 이벤트</h2>
            <p className="text-indigo-200 text-sm">프로포즈 과정을 영상으로 찍어 올려주시면 AI 영상을 무료로 만들어 드립니다</p>
          </div>
          <Link
            href="/blog/1"
            className="flex-shrink-0 px-5 py-2.5 bg-white text-indigo-600 text-sm font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            자세히 보기
          </Link>
        </div>

        {/* Post list */}
        <div className="space-y-0 divide-y divide-gray-100">
          {POSTS.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex gap-5 py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl transition-colors group"
            >
              {/* Thumbnail */}
              <div className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl bg-gradient-to-br ${post.thumbnail.bg} flex items-center justify-center`}>
                <span className="text-white text-xs font-semibold text-center px-2 leading-tight">{post.thumbnail.label}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[post.tag]}`}>
                    {post.tag}
                  </span>
                  {post.event && (
                    <span className="text-xs font-semibold text-white bg-indigo-500 px-2 py-0.5 rounded-full">{t.blog.currentEvent}</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-2 hidden md:block">
                  {post.desc}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{t.blog.readTime} {post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border border-gray-200 rounded-2xl p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.blog.ctaTitle}</h3>
          <p className="text-gray-500 mb-6">{t.blog.ctaDesc}</p>
          <Link
            href="/create"
            className="inline-block px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {t.blog.ctaBtn}
          </Link>
        </div>
      </div>
    </div>
  )
}
