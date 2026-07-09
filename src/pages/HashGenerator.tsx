import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HashGenerator() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})

  const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

  const generateHashes = async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const newResults: Record<string, string> = {}

    for (const algo of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algo.replace('-', ''), data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        newResults[algo] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
      } catch {
        newResults[algo] = 'N/A'
      }
    }

    setResults(newResults)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('hash.title')}</h2>
      <p className="text-gray-500 mb-6">{t('hash.desc')}</p>

      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('hash.placeholder')}
      />

      <button onClick={generateHashes} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        {t('hash.generate')}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3 mt-6">
          {Object.entries(results).map(([algo, hash]) => (
            <div key={algo} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500">{algo}</span>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-xs text-blue-500 hover:text-blue-600">
                  {t('copy')}
                </button>
              </div>
              <div className="font-mono text-xs break-all select-all">{hash}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
