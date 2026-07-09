import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsonYaml() {
  const { t } = useTranslation()
  const [json, setJson] = useState('')
  const [yaml, setYaml] = useState('')
  const [mode, setMode] = useState<'jsonToYaml' | 'yamlToJson'>('jsonToYaml')
  const [error, setError] = useState('')

  const jsonToYamlConvert = () => {
    try {
      const data = JSON.parse(json)
      const toYaml = (obj: any, indent = 0): string => {
        const prefix = '  '.repeat(indent)
        if (Array.isArray(obj)) {
          return obj.map((item) => {
            if (typeof item === 'object' && item !== null) {
              return `${prefix}-\n${toYaml(item, indent + 1)}`
            }
            return `${prefix}- ${item}`
          }).join('\n')
        }
        if (typeof obj === 'object' && obj !== null) {
          return Object.entries(obj)
            .map(([key, val]) => {
              if (typeof val === 'object' && val !== null) {
                return `${prefix}${key}:\n${toYaml(val, indent + 1)}`
              }
              return `${prefix}${key}: ${val}`
            })
            .join('\n')
        }
        return String(obj)
      }
      setYaml(toYaml(data))
      setError('')
    } catch {
      setError(t('jsonyaml.errorJson'))
    }
  }

  const yamlToJsonConvert = () => {
    try {
      const lines = yaml.split('\n')
      const result: any = {}
      let currentKey = ''
      lines.forEach((line) => {
        const match = line.match(/^(\s*)([\w-]+):\s*(.*)$/)
        if (match) {
          const [, , key, val] = match
          if (val) {
            try { result[key] = JSON.parse(val) } catch { result[key] = val }
          } else {
            currentKey = key
            result[key] = {}
          }
        }
      })
      setJson(JSON.stringify(result, null, 2))
      setError('')
    } catch {
      setError(t('jsonyaml.errorYaml'))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('jsonyaml.title')}</h2>
      <p className="text-[#909399] mb-6">{t('jsonyaml.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setMode('jsonToYaml')} className={`tab-btn ${mode === 'jsonToYaml' ? 'active' : ''}`}>
          JSON → YAML
        </button>
        <button onClick={() => setMode('yamlToJson')} className={`tab-btn ${mode === 'yamlToJson' ? 'active' : ''}`}>
          YAML → JSON
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">JSON</label>
          <textarea
            className="input-field h-64 font-mono text-sm resize-y"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='{"name":"John","age":25}'
          />
          {mode === 'jsonToYaml' && (
            <button onClick={jsonToYamlConvert} className="btn-primary mt-3">JSON → YAML</button>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">YAML</label>
          <textarea
            className="input-field h-64 font-mono text-sm resize-y"
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            placeholder="name: John\nage: 25"
          />
          {mode === 'yamlToJson' && (
            <button onClick={yamlToJsonConvert} className="btn-primary mt-3">YAML → JSON</button>
          )}
        </div>
      </div>

      {error && <div className="text-[#f56c6c] text-sm mt-4">{error}</div>}
    </div>
  )
}
