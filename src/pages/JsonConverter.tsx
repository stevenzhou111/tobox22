import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsonConverter() {
  const { t } = useTranslation()
  const [json, setJson] = useState('')
  const [csv, setCsv] = useState('')
  const [xml, setXml] = useState('')
  const [yaml, setYaml] = useState('')
  const [error, setError] = useState('')

  const jsonToCsv = () => {
    try {
      const data = JSON.parse(json)
      if (!Array.isArray(data) || data.length === 0) {
        setError(t('jsonconverter.errorArray'))
        return
      }
      const headers = Object.keys(data[0])
      const lines = [headers.join(',')]
      data.forEach((row) => {
        lines.push(headers.map((h) => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(','))
      })
      setCsv(lines.join('\n'))
      setError('')
    } catch {
      setError(t('jsonconverter.errorJson'))
    }
  }

  const jsonToXml = () => {
    try {
      const data = JSON.parse(json)
      let xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n'
      if (Array.isArray(data)) {
        data.forEach((item) => {
          xmlStr += '  <item>\n'
          Object.entries(item).forEach(([key, val]) => {
            xmlStr += `    <${key}>${val}</${key}>\n`
          })
          xmlStr += '  </item>\n'
        })
      } else {
        Object.entries(data).forEach(([key, val]) => {
          xmlStr += `  <${key}>${val}</${key}>\n`
        })
      }
      xmlStr += '</root>'
      setXml(xmlStr)
      setError('')
    } catch {
      setError(t('jsonconverter.errorJson'))
    }
  }

  const jsonToYaml = () => {
    try {
      const data = JSON.parse(json)
      const toYaml = (obj: any, indent = 0): string => {
        const prefix = '  '.repeat(indent)
        if (Array.isArray(obj)) {
          return obj.map((item) => `${prefix}- ${typeof item === 'object' ? '\n' + toYaml(item, indent + 1) : item}`).join('\n')
        }
        return Object.entries(obj)
          .map(([key, val]) => `${prefix}${key}: ${typeof val === 'object' ? '\n' + toYaml(val, indent + 1) : val}`)
          .join('\n')
      }
      setYaml(toYaml(data))
      setError('')
    } catch {
      setError(t('jsonconverter.errorJson'))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('jsonconverter.title')}</h2>
      <p className="text-[#909399] mb-6">{t('jsonconverter.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">JSON</label>
        <textarea
          className="input-field h-48 font-mono text-sm resize-y"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='[{"name":"John","age":25}]'
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={jsonToCsv} className="btn-primary">JSON → CSV</button>
        <button onClick={jsonToXml} className="btn-primary">JSON → XML</button>
        <button onClick={jsonToYaml} className="btn-primary">JSON → YAML</button>
      </div>

      {error && <div className="text-[#f56c6c] text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">CSV</label>
          <textarea className="input-field h-40 font-mono text-xs resize-y bg-[#f5f7fa]" value={csv} readOnly />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">XML</label>
          <textarea className="input-field h-40 font-mono text-xs resize-y bg-[#f5f7fa]" value={xml} readOnly />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">YAML</label>
          <textarea className="input-field h-40 font-mono text-xs resize-y bg-[#f5f7fa]" value={yaml} readOnly />
        </div>
      </div>
    </div>
  )
}
