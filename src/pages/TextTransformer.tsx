import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextTransformer() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const transforms = [
    { label: t('texttransform.uppercase'), fn: (s: string) => s.toUpperCase() },
    { label: t('texttransform.lowercase'), fn: (s: string) => s.toLowerCase() },
    { label: t('texttransform.capitalize'), fn: (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase()) },
    { label: t('texttransform.reverse'), fn: (s: string) => s.split('').reverse().join('') },
    { label: t('texttransform.duplicate'), fn: (s: string) => s.split('\n').map((l) => l + '\n' + l).join('\n') },
    { label: t('texttransform.trim'), fn: (s: string) => s.split('\n').map((l) => l.trim()).join('\n') },
    { label: t('texttransform.dedup'), fn: (s: string) => [...new Set(s.split('\n'))].join('\n') },
    { label: t('textfilter.removeEmpty'), fn: (s: string) => s.split('\n').filter((l) => l.trim()).join('\n') },
    { label: t('textfilter.removeSpaces'), fn: (s: string) => s.replace(/\s+/g, ' ') },
    { label: t('textfilter.addLineNumbers'), fn: (s: string) => s.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n') },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('texttransform.title')}</h2>
      <p className="text-[#909399] mb-6">{t('texttransform.desc')}</p>
      <textarea className="input-field h-40 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('texttransform.placeholder')} />
      <div className="flex flex-wrap gap-2 mb-4">
        {transforms.map((t) => (
          <button key={t.label} onClick={() => setResult(t.fn(text))} className="btn-secondary text-sm">{t.label}</button>
        ))}
      </div>
      {result && <textarea className="input-field h-40 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
