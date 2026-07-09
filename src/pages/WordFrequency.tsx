import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function WordFrequency() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'word' | 'char'>('word')
  const [sortBy, setSortBy] = useState<'count' | 'alpha'>('count')

  const frequency = useMemo(() => {
    if (!text.trim()) return []
    const map = new Map<string, number>()

    if (mode === 'word') {
      const words = text.toLowerCase().match(/[\w\u4e00-\u9fa5]+/g) || []
      words.forEach((w) => map.set(w, (map.get(w) || 0) + 1))
    } else {
      const chars = text.replace(/\s/g, '')
      for (const c of chars) {
        map.set(c, (map.get(c) || 0) + 1)
      }
    }

    const entries = Array.from(map.entries())
    if (sortBy === 'count') {
      entries.sort((a, b) => b[1] - a[1])
    } else {
      entries.sort((a, b) => a[0].localeCompare(b[0]))
    }
    return entries
  }, [text, mode, sortBy])

  const maxCount = frequency[0]?.[1] || 1

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('wordfreq.title')}</h2>
      <p className="text-gray-500 mb-6">{t('wordfreq.desc')}</p>

      <textarea
        className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('wordfreq.placeholder')}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={() => setMode('word')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === 'word' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          {t('wordfreq.byWord')}
        </button>
        <button onClick={() => setMode('char')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === 'char' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          {t('wordfreq.byChar')}
        </button>
        <button onClick={() => setSortBy(sortBy === 'count' ? 'alpha' : 'count')} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          {sortBy === 'count' ? t('wordfreq.sortAlpha') : t('wordfreq.sortCount')}
        </button>
      </div>

      {frequency.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
          <div className="space-y-2">
            {frequency.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="font-mono text-sm w-24 truncate" title={word}>{word}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
