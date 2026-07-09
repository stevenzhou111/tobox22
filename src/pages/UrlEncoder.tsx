import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function UrlEncoder() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input))
      setError('')
    } catch {
      setError(t('url.error'))
    }
  }

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input))
      setError('')
    } catch {
      setError(t('url.error'))
    }
  }

  const handleEncodeAll = () => {
    try {
      const encoder = new TextEncoder()
      const bytes = encoder.encode(input)
      const hex = Array.from(bytes).map(b => `%${b.toString(16).toUpperCase().padStart(2, '0')}`).join('')
      setOutput(hex)
      setError('')
    } catch {
      setError(t('url.error'))
    }
  }

  const handleDecodeAll = () => {
    try {
      const decoded = input.replace(/%([0-9A-Fa-f]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      setOutput(decoded)
      setError('')
    } catch {
      setError(t('url.error'))
    }
  }

  return (
    <div>
      <ToolHeader title={t('url.title')} desc={t('url.desc')} />

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('url.placeholder')}
          className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="flex gap-2 flex-wrap">
          <button onClick={handleEncode} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            {t('url.encode')}
          </button>
          <button onClick={handleDecode} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
            {t('url.decode')}
          </button>
          <button onClick={handleEncodeAll} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
            {t('url.encodeAll')}
          </button>
          <button onClick={handleDecodeAll} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
            {t('url.decodeAll')}
          </button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
            {t('clear')}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        {output && (
          <div className="relative">
            <textarea
              readOnly
              value={output}
              className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y bg-gray-50"
            />
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="absolute top-2 right-2 px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t('copy')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
