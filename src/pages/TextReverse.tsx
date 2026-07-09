import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextReverse() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const reverseText = () => {
    setResult(text.split('').reverse().join(''))
  }

  const reverseLines = () => {
    setResult(text.split('\n').reverse().join('\n'))
  }

  const reverseWords = () => {
    setResult(text.split(/\s+/).reverse().join(' '))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('textreverse.title')}</h2>
      <p className="text-gray-500 mb-6">{t('textreverse.desc')}</p>

      <textarea
        className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textreverse.placeholder')}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={reverseText} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('textreverse.reverseChars')}
        </button>
        <button onClick={reverseLines} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('textreverse.reverseLines')}
        </button>
        <button onClick={reverseWords} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
          {t('textreverse.reverseWords')}
        </button>
      </div>

      {result && (
        <div className="mt-6">
          <div className="text-xs text-gray-400 mb-1">{t('output')}</div>
          <pre className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all">{result}</pre>
        </div>
      )}
    </div>
  )
}
