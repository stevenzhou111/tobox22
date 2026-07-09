import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsonFormatterAdvanced() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (indent: number) => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj, null, indent))
      setError('')
    } catch {
      setError(t('jsonadv.error'))
    }
  }

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)))
      setError('')
    } catch {
      setError(t('jsonadv.error'))
    }
  }

  const sortKeys = () => {
    try {
      const sortObj = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(sortObj)
        if (typeof obj === 'object' && obj !== null) {
          return Object.keys(obj).sort().reduce((acc, key) => {
            acc[key] = sortObj(obj[key])
            return acc
          }, {} as any)
        }
        return obj
      }
      setOutput(JSON.stringify(sortObj(JSON.parse(input)), null, 2))
      setError('')
    } catch {
      setError(t('jsonadv.error'))
    }
  }

  const removeEmpty = () => {
    try {
      const removeNulls = (obj: any): any => {
        if (Array.isArray(obj)) return obj.filter((v) => v !== null).map(removeNulls)
        if (typeof obj === 'object' && obj !== null) {
          return Object.entries(obj)
            .filter(([, v]) => v !== null && v !== '' && v !== undefined)
            .reduce((acc, [k, v]) => ({ ...acc, [k]: removeNulls(v) }), {} as any)
        }
        return obj
      }
      setOutput(JSON.stringify(removeNulls(JSON.parse(input)), null, 2))
      setError('')
    } catch {
      setError(t('jsonadv.error'))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('jsonadv.title')}</h2>
      <p className="text-[#909399] mb-6">{t('jsonadv.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('input')}</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('jsonadv.placeholder')} />
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('output')}</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y bg-[#f5f7fa]" value={output} readOnly />
        </div>
      </div>
      {error && <div className="text-[#f56c6c] text-sm mt-2">{error}</div>}
      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => format(2)} className="btn-primary">{t('jsonadv.format2')}</button>
        <button onClick={() => format(4)} className="btn-primary">{t('jsonadv.format4')}</button>
        <button onClick={minify} className="btn-secondary">{t('jsonadv.minify')}</button>
        <button onClick={sortKeys} className="btn-secondary">{t('jsonadv.sortKeys')}</button>
        <button onClick={removeEmpty} className="btn-secondary">{t('jsonadv.removeEmpty')}</button>
        {output && <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">{t('copy')}</button>}
      </div>
    </div>
  )
}
