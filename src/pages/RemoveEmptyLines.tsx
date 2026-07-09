import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RemoveEmptyLines() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const removeEmpty = () => {
    setResult(text.replace(/^\s*\n/gm, ''))
  }

  const removeWhitespace = () => {
    setResult(text.replace(/^\s+$/gm, '').replace(/\n{3,}/g, '\n\n'))
  }

  const removeDuplicates = () => {
    const lines = text.split('\n')
    const unique = [...new Set(lines)]
    setResult(unique.join('\n'))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('removeempty.title')}</h2>
      <p className="text-gray-500 mb-6">{t('removeempty.desc')}</p>

      <textarea
        className="w-full h-48 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('removeempty.placeholder')}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={removeEmpty} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('removeempty.removeEmpty')}
        </button>
        <button onClick={removeWhitespace} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('removeempty.removeWhitespace')}
        </button>
        <button onClick={removeDuplicates} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('removeempty.removeDuplicates')}
        </button>
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
