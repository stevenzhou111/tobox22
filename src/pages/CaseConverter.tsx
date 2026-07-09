import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CaseConverter() {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const transformations = [
    { label: t('case.uppercase'), fn: (s: string) => s.toUpperCase() },
    { label: t('case.lowercase'), fn: (s: string) => s.toLowerCase() },
    { label: t('case.titlecase'), fn: (s: string) => s.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) },
    { label: t('case.sentencecase'), fn: (s: string) => s.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()) },
    { label: t('case.invertcase'), fn: (s: string) => s.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('') },
    { label: t('case.togglecase'), fn: (s: string) => s.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('') },
  ]

  const [results, setResults] = useState<Record<string, string>>({})

  const handleTransform = (label: string, fn: (s: string) => string) => {
    setResults((prev) => ({ ...prev, [label]: fn(text) }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('case.title')}</h2>
      <p className="text-gray-500 mb-6">{t('case.desc')}</p>

      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('case.placeholder')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {transformations.map((item) => (
          <button
            key={item.label}
            onClick={() => handleTransform(item.label, item.fn)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-6">
        {Object.entries(results).map(([label, result]) => (
          <div key={label} className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className="font-mono text-sm break-all">{result}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
