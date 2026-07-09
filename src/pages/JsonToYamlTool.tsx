import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsonToYamlTool() {
  const { t } = useTranslation()
  const [json, setJson] = useState('')
  const [yaml, setYaml] = useState('')

  const toYaml = (obj: any, indent = 0): string => {
    const prefix = '  '.repeat(indent)
    if (Array.isArray(obj)) return obj.map((item) => `${prefix}- ${typeof item === 'object' ? '\n' + toYaml(item, indent + 1) : item}`).join('\n')
    if (typeof obj === 'object' && obj !== null) return Object.entries(obj).map(([k, v]) => `${prefix}${k}: ${typeof v === 'object' ? '\n' + toYaml(v, indent + 1) : v}`).join('\n')
    return String(obj)
  }

  const convert = () => {
    try { setYaml(toYaml(JSON.parse(json))) } catch { setYaml('Invalid JSON') }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('json2yaml.title')}</h2>
      <p className="text-[#909399] mb-6">{t('json2yaml.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">JSON</label>
          <textarea className="input-field h-64 font-mono text-sm resize-y" value={json} onChange={(e) => setJson(e.target.value)} placeholder='{"key":"value"}' />
          <button onClick={convert} className="btn-primary mt-3">JSON → YAML</button>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">YAML</label>
          <textarea className="input-field h-64 font-mono text-sm resize-y bg-[#f5f7fa]" value={yaml} readOnly />
        </div>
      </div>
    </div>
  )
}
