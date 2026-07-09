import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextCounter() {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    sentences: text.split(/[.!?。！？]+/).filter((s) => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textcounter.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textcounter.desc')}</p>
      <textarea className="input-field h-48 font-mono text-sm resize-y mb-6" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('textcounter.placeholder')} />
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: t('textcounter.chars'), value: stats.chars, color: '#409eff' },
          { label: t('textcounter.charsNoSpace'), value: stats.charsNoSpace, color: '#67c23a' },
          { label: t('textcounter.words'), value: stats.words, color: '#e6a23c' },
          { label: t('textcounter.lines'), value: stats.lines, color: '#f56c6c' },
          { label: t('textcounter.sentences'), value: stats.sentences, color: '#9b59b6' },
          { label: t('textcounter.paragraphs'), value: stats.paragraphs, color: '#e91e63' },
        ].map((item) => (
          <div key={item.label} className="bg-[#f5f7fa] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
            <div className="text-xs text-[#909399] mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
