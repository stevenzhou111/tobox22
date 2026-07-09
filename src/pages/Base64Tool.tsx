import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function Base64Tool() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleEncode = () => {
    try {
      const encoder = new TextEncoder()
      const bytes = encoder.encode(input)
      const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('')
      setOutput(btoa(binary))
      setError('')
    } catch {
      setOutput('')
      setError('Encoding failed')
    }
  }

  const handleDecode = () => {
    try {
      const binary = atob(input)
      const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
      const decoder = new TextDecoder()
      setOutput(decoder.decode(bytes))
      setError('')
    } catch {
      setOutput('')
      setError(t('base64.error'))
    }
  }

  return (
    <div>
      <ToolHeader title={t('base64.title')} desc={t('base64.desc')} />

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('base64.placeholder')}
          className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="flex gap-2">
          <button onClick={handleEncode} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            {t('base64.encode')}
          </button>
          <button onClick={handleDecode} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
            {t('base64.decode')}
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
