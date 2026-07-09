import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextReplace() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [useRegex, setUseRegex] = useState(false)
  const [result, setResult] = useState('')
  const [count, setCount] = useState(0)

  const handleReplace = () => {
    try {
      const regex = useRegex ? new RegExp(find, 'g') : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      const matches = text.match(regex)
      setCount(matches ? matches.length : 0)
      setResult(text.replace(regex, replace))
    } catch {
      setCount(0)
      setResult(t('textreplace.error'))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('textreplace.title')}</h2>
      <p className="text-gray-500 mb-6">{t('textreplace.desc')}</p>

      <textarea
        className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textreplace.placeholder')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('textreplace.find')}</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400"
            value={find}
            onChange={(e) => setFind(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('textreplace.replace')}</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-400"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" />
          {t('textreplace.useRegex')}
        </label>
        <button onClick={handleReplace} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('textreplace.replaceBtn')}
        </button>
        {count > 0 && <span className="text-sm text-gray-500">{t('textreplace.replaced', { count })}</span>}
      </div>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('output')}</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-blue-500 hover:text-blue-600">
              {t('copy')}
            </button>
          </div>
          <pre className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">{result}</pre>
        </div>
      )}
    </div>
  )
}
