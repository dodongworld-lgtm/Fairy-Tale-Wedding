'use client'
import { useLang } from '../../contexts/LangContext'

export function StepTemplate({ onNext }: { onNext: (type: string, subType: string) => void }) {
  const { t } = useLang()

  const TEMPLATES = [
    {
      type: 'propose',
      title: t.template.proposeTitle,
      subtitle: t.template.proposeSubtitle,
      color: 'from-violet-500 to-violet-600',
      illustration: (
        <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 opacity-40">
          <circle cx="40" cy="32" r="16" stroke="white" strokeWidth="3" fill="none"/>
          <path d="M28 32 C28 24 40 18 40 18 C40 18 52 24 52 32 C52 40 40 50 40 50 C40 50 28 40 28 32Z" fill="white" fillOpacity=".3"/>
          <rect x="32" y="50" width="16" height="4" rx="2" fill="white" fillOpacity=".5"/>
          <rect x="30" y="54" width="20" height="3" rx="1.5" fill="white" fillOpacity=".3"/>
        </svg>
      ),
      options: [
        { id: 'ring', label: t.template.proposeSubtitle, desc: t.template.classic },
        { id: 'recommend', label: t.template.aiStyle, desc: t.template.aiStyleDesc },
        { id: 'custom', label: t.template.custom, desc: t.template.customDesc },
      ],
    },
    {
      type: 'wedding',
      title: t.template.weddingTitle,
      subtitle: t.template.weddingSubtitle,
      color: 'from-accent to-accent/80',
      illustration: (
        <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 opacity-40">
          <path d="M15 55 L40 20 L65 55 Z" stroke="white" strokeWidth="2.5" fill="none"/>
          <path d="M25 55 L40 32 L55 55 Z" fill="white" fillOpacity=".3"/>
          <circle cx="40" cy="15" r="5" fill="white" fillOpacity=".5"/>
          <rect x="30" y="55" width="20" height="8" rx="2" fill="white" fillOpacity=".2" stroke="white" strokeOpacity=".3" strokeWidth="1.5"/>
        </svg>
      ),
      options: [
        { id: 'why', label: t.template.whyMarry, desc: t.template.whyMarryDesc },
        { id: 'memories', label: t.template.loveStories, desc: t.template.loveStoriesDesc },
        { id: 'story', label: t.template.ourStory, desc: t.template.ourStoryDesc },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col">
      {/* Minimal header */}
      <header className="flex-shrink-0 h-14 flex items-center px-6 border-b border-border bg-white/80 backdrop-blur-sm">
        <a href="/" className="text-sm font-bold text-text">Once Upon Us</a>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">{t.template.start}</p>
          <h1 className="text-2xl sm:text-3xl font-black text-text mb-2">{t.template.question}</h1>
          <p className="text-text-secondary text-sm">{t.template.questionDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {TEMPLATES.map(tmpl => (
            <div key={tmpl.type} className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Card top */}
              <div className={`bg-gradient-to-br ${tmpl.color} px-6 pt-6 pb-5 flex items-start justify-between`}>
                <div>
                  <h2 className="text-xl font-black text-white mb-0.5">{tmpl.title}</h2>
                  <p className="text-white/70 text-xs">{tmpl.subtitle}</p>
                </div>
                <div className="flex-shrink-0">{tmpl.illustration}</div>
              </div>

              {/* Options */}
              <div className="p-3 space-y-1.5">
                {tmpl.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onNext(tmpl.type, opt.id)}
                    className="w-full text-left px-4 py-3.5 rounded-2xl border border-border hover:border-primary-light hover:bg-primary-light/10 transition-all group cursor-pointer"
                  >
                    <div className="font-semibold text-text text-sm group-hover:text-primary-dark">{opt.label}</div>
                    <div className="text-xs text-text-muted mt-0.5 group-hover:text-primary">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
