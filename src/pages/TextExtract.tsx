import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextExtract() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'urls' | 'emails' | 'numbers'>('urls')

  const extract = (): string[] => {
    if (!text.trim()) return []
    switch (mode) {
      case 'urls':
        return [...new Set(text.match(/https?:\/\/[^\s]+/g) || [])]
      case 'emails':
        return [...new Set(text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])]
      case 'numbers':
        return [...new Set(text.match(/-?\d+\.?\d*/g) || [])]
    }
  }

  const results = extract()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('textextract.title')}</h2>
      <p className="text-gray-500 mb-6">{t('textextract.desc')}</p>

      <textarea
        className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textextract.placeholder')}
      />

      <div className="flex gap-3 mt-4">
        {(['urls', 'emails', 'numbers'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === m ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t(`textextract.modes.${m}`)}
          </button>
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('textextract.found', { count: results.length })}</span>
            <button onClick={() => navigator.clipboard.writeText(results.join('\n'))} className="text-xs text-blue-500 hover:text-blue-600">
              {t('copy')}
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {results.map((r, i) => (
              <div key={i} className="font-mono text-sm break-all select-all">{r}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
