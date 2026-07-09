import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function CSVJSON() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<'csvToJson' | 'jsonToCsv'>('csvToJson')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const csvToJson = () => {
    setError('')
    try {
      const lines = input.trim().split('\n')
      if (lines.length < 2) {
        setError(t('csvjson.errorLines'))
        return
      }

      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
      const result = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
        const obj: Record<string, string> = {}
        headers.forEach((h, idx) => {
          obj[h] = values[idx] || ''
        })
        result.push(obj)
      }

      setOutput(JSON.stringify(result, null, 2))
    } catch {
      setError(t('csvjson.errorParse'))
    }
  }

  const jsonToCsv = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data) || data.length === 0) {
        setError(t('csvjson.errorArray'))
        return
      }

      const headers = Object.keys(data[0])
      const csvLines = [headers.join(',')]

      data.forEach((row) => {
        const values = headers.map((h) => {
          const val = String(row[h] || '')
          return val.includes(',') ? `"${val}"` : val
        })
        csvLines.push(values.join(','))
      })

      setOutput(csvLines.join('\n'))
    } catch {
      setError(t('csvjson.errorJson'))
    }
  }

  const handleConvert = () => {
    if (mode === 'csvToJson') csvToJson()
    else jsonToCsv()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setInput(ev.target?.result as string)
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('csvjson.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('csvjson.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode('csvToJson')}
          className={`tab-btn ${mode === 'csvToJson' ? 'active' : ''}`}
        >
          {t('csvjson.csvToJson')}
        </button>
        <button
          onClick={() => setMode('jsonToCsv')}
          className={`tab-btn ${mode === 'jsonToCsv' ? 'active' : ''}`}
        >
          {t('csvjson.jsonToCsv')}
        </button>
      </div>

      <input ref={fileRef} type="file" accept=".csv,.json" onChange={handleFile} className="hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-secondary)]">{t('input')}</span>
            <button onClick={() => fileRef.current?.click()} className="text-sm text-blue-500 hover:text-blue-600">
              {t('csvjson.upload')}
            </button>
          </div>
          <textarea
            className="input-field font-mono text-xs h-64 resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'csvToJson' ? t('csvjson.csvPlaceholder') : t('csvjson.jsonPlaceholder')}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-secondary)]">{t('output')}</span>
            {output && (
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-blue-500 hover:text-blue-600">
                {t('copy')}
              </button>
            )}
          </div>
          <textarea
            className="input-field font-mono text-xs h-64 resize-y bg-[var(--bg)]"
            value={output}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={handleConvert} className="btn-primary">
          {t('convert')}
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="btn-secondary">
          {t('clear')}
        </button>
      </div>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
    </div>
  )
}
