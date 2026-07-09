import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextStatistics() {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const stats = {
    sentences: text.split(/[.!?。！？]+/).filter((s) => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter((p) => p.trim()).length,
    avgWordLength: text.trim()
      ? (text.replace(/\s/g, '').length / (text.trim().split(/\s+/).length || 1)).toFixed(1)
      : '0',
    readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200),
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textstats.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textstats.desc')}</p>

      <textarea
        className="input-field h-48 font-mono text-sm resize-y mb-6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textstats.placeholder')}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#409eff]">{stats.sentences}</div>
          <div className="text-sm text-[#909399] mt-1">{t('textstats.sentences')}</div>
        </div>
        <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#67c23a]">{stats.paragraphs}</div>
          <div className="text-sm text-[#909399] mt-1">{t('textstats.paragraphs')}</div>
        </div>
        <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#e6a23c]">{stats.avgWordLength}</div>
          <div className="text-sm text-[#909399] mt-1">{t('textstats.avgWordLength')}</div>
        </div>
        <div className="bg-[#f5f7fa] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#f56c6c]">{stats.readingTime}</div>
          <div className="text-sm text-[#909399] mt-1">{t('textstats.readingTime')}</div>
        </div>
      </div>
    </div>
  )
}
