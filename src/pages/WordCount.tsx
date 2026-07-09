import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function WordCount() {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    chinese: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    english: (text.match(/[a-zA-Z]/g) || []).length,
    numbers: (text.match(/[0-9]/g) || []).length,
    punctuation: (text.match(/[^\w\u4e00-\u9fa5\s]/g) || []).length,
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('wordcount.title')}</h2>
      <p className="text-gray-500 mb-6">{t('wordcount.desc')}</p>

      <textarea
        className="w-full h-64 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('wordcount.placeholder')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { label: t('wordcount.chars'), value: stats.chars },
          { label: t('wordcount.charsNoSpace'), value: stats.charsNoSpace },
          { label: t('wordcount.words'), value: stats.words },
          { label: t('wordcount.lines'), value: stats.lines },
          { label: t('wordcount.chinese'), value: stats.chinese },
          { label: t('wordcount.english'), value: stats.english },
          { label: t('wordcount.numbers'), value: stats.numbers },
          { label: t('wordcount.punctuation'), value: stats.punctuation },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{item.value}</div>
            <div className="text-sm text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
