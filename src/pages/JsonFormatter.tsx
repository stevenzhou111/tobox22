import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ToolHeader from '../components/ToolHeader'

export default function JsonFormatter() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e: any) {
      const match = e.message.match(/position (\d+)/)
      let line = ''
      if (match) {
        const pos = parseInt(match[1])
        line = t('json.errorLine', { line: input.substring(0, pos).split('\n').length })
      }
      setOutput('')
      setError(`${t('json.invalid')}${line ? ' - ' + line : ''}`)
    }
  }

  const handleCompress = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch {
      setOutput('')
      setError(t('json.invalid'))
    }
  }

  const handleValidate = () => {
    try {
      JSON.parse(input)
      setOutput(t('json.valid'))
      setError('')
    } catch (e: any) {
      setOutput('')
      setError(t('json.invalid'))
    }
  }

  return (
    <div>
      <ToolHeader title={t('json.title')} desc={t('json.desc')} />

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('json.placeholder')}
          className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        <div className="flex gap-2">
          <button onClick={handleFormat} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            {t('json.format')}
          </button>
          <button onClick={handleCompress} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium">
            {t('json.compress')}
          </button>
          <button onClick={handleValidate} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
            {t('json.validate')}
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
              className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y bg-gray-50"
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
