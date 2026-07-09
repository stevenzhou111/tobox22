import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UnicodeConverter() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [unicode, setUnicode] = useState('')

  const textToUnicode = () => {
    const result = Array.from(text)
      .map((c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
      .join('')
    setUnicode(result)
  }

  const unicodeToText = () => {
    try {
      const result = unicode.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      setText(result)
    } catch {
      console.error('Invalid unicode')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('unicode.title')}</h2>
      <p className="text-gray-500 mb-6">{t('unicode.desc')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('unicode.text')}</label>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('unicode.textPlaceholder')}
          />
          <button onClick={textToUnicode} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('unicode.textToUnicode')}
          </button>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">{t('unicode.unicode')}</label>
          <textarea
            className="w-full h-40 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-y focus:outline-none focus:border-blue-400"
            value={unicode}
            onChange={(e) => setUnicode(e.target.value)}
            placeholder={t('unicode.unicodePlaceholder')}
          />
          <button onClick={unicodeToText} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
            {t('unicode.unicodeToText')}
          </button>
        </div>
      </div>
    </div>
  )
}
