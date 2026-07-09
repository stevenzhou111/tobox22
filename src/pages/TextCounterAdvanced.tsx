import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextCounterAdvanced() {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    sentences: text.split(/[.!?。！？]+/).filter((s) => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
    chinese: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    english: (text.match(/[a-zA-Z]/g) || []).length,
    numbers: (text.match(/[0-9]/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textcounteradv.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textcounteradv.desc')}</p>
      <textarea className="input-field h-48 font-mono text-sm resize-y mb-6" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('textcounteradv.placeholder')} />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: t('textcounteradv.chars'), value: stats.chars, color: '#409eff' },
          { label: t('textcounteradv.charsNoSpace'), value: stats.charsNoSpace, color: '#67c23a' },
          { label: t('textcounteradv.words'), value: stats.words, color: '#e6a23c' },
          { label: t('textcounteradv.lines'), value: stats.lines, color: '#f56c6c' },
          { label: t('textcounteradv.sentences'), value: stats.sentences, color: '#9b59b6' },
          { label: t('textcounteradv.paragraphs'), value: stats.paragraphs, color: '#e91e63' },
          { label: t('textcounteradv.chinese'), value: stats.chinese, color: '#00bcd4' },
          { label: t('textcounteradv.english'), value: stats.english, color: '#ff9800' },
          { label: t('textcounteradv.numbers'), value: stats.numbers, color: '#795548' },
          { label: t('textcounteradv.spaces'), value: stats.spaces, color: '#607d8b' },
        ].map((item) => (
          <div key={item.label} className="bg-[#f5f7fa] rounded-lg p-3 text-center">
            <div className="text-xl font-bold" style={{ color: item.color }}>{item.value}</div>
            <div className="text-xs text-[#909399] mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
