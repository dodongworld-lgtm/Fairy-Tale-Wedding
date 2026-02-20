import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-900 to-purple-950">
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-yellow-400">✨ Once Upon Us</div>
        <Link href="/create" className="px-6 py-2 bg-yellow-400 text-purple-900 font-bold rounded-full hover:bg-yellow-300 transition-colors">
          시작하기
        </Link>
      </header>
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <div className="text-7xl mb-6">🏰</div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          우리의 사랑 이야기를<br />
          <span className="text-yellow-400">디즈니 동화</span>로 만들어드립니다
        </h1>
        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
          사진 몇 장과 추억을 입력하면, AI가 60초짜리 프로포즈 영상을 만들어드립니다. 3분이면 충분해요.
        </p>
        <Link href="/create" className="inline-block px-12 py-5 bg-yellow-400 text-purple-900 font-bold text-xl rounded-full hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/30">
          지금 무료로 미리보기 →
        </Link>
      </section>
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🎨', title: 'AI 디즈니 스타일', desc: '실제 사진을 디즈니 애니메이션 캐릭터로 변환합니다.' },
            { icon: '✍️', title: '감성 스토리 자동 생성', desc: 'AI가 두 분만의 이야기로 4막 구조의 스토리를 씁니다.' },
            { icon: '🎬', title: '예고편 같은 편집', desc: '오케스트라 BGM, 감성 나레이션, 시네마틱 효과로 완성됩니다.' }
          ].map(f => (
            <div key={f.title} className="bg-white/5 rounded-2xl p-8 text-center border border-purple-700">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-purple-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-white mb-4">지금 시작하면<br />9,900원부터</h2>
        <p className="text-purple-300 mb-8">생성 미리보기는 무료입니다</p>
        <Link href="/create" className="inline-block px-10 py-4 bg-yellow-400 text-purple-900 font-bold text-lg rounded-full hover:bg-yellow-300 transition-all">
          무료로 시작하기
        </Link>
      </section>
    </main>
  )
}
