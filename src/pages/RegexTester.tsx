import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function RegexTester() {
  const { t } = useTranslation()
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')
  const [matches, setMatches] = useState<{ match: string; index: number }[]>([])
  const [error, setError] = useState('')
  const [highlighted, setHighlighted] = useState('')

  const handleTest = () => {
    setError('')
    setMatches([])
    setHighlighted('')

    if (!pattern) {
      setHighlighted(text)
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const found: { match: string; index: number }[] = []
      let m

      if (flags.includes('g')) {
        while ((m = regex.exec(text)) !== null) {
          found.push({ match: m[0], index: m.index })
          if (m[0].length === 0) regex.lastIndex++
        }
      } else {
        m = regex.exec(text)
        if (m) found.push({ match: m[0], index: m.index })
      }

      setMatches(found)

      // Build highlighted text
      if (found.length === 0) {
        setHighlighted(text)
        return
      }

      const parts: string[] = []
      let lastIndex = 0
      for (const f of found) {
        parts.push(text.slice(lastIndex, f.index))
        parts.push(`<mark class="bg-yellow-200 px-0.5 rounded">${text.slice(f.index, f.index + f.match.length)}</mark>`)
        lastIndex = f.index + f.match.length
      }
      parts.push(text.slice(lastIndex))
      setHighlighted(parts.join(''))
    } catch (e: any) {
      setError(e.message)
      setHighlighted(text)
    }
  }

  return (
    <div>
      <ToolHeader title={t('regex.title')} desc={t('regex.desc')} />

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t('regex.patternPlaceholder')}
            className="px-4 py-2.5 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder={t('regex.flags')}
            className="w-24 px-3 py-2.5 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('regex.textPlaceholder')}
          className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="flex gap-2">
          <button onClick={handleTest} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            {t('convert')}
          </button>
          <button onClick={() => { setPattern(''); setText(''); setMatches([]); setHighlighted(''); setError('') }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
            {t('clear')}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        {matches.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            {t('regex.matchCount', { count: matches.length })}
          </div>
        )}

        {highlighted && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">{t('output')}</div>
            <pre
              className="font-mono text-sm whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}

        {matches.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">#</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Match</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Index</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2 font-mono text-gray-900">{m.match}</td>
                    <td className="px-4 py-2 text-gray-500">{m.index}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
