import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SqlFormatter() {
  const { t } = useTranslation()
  const [sql, setSql] = useState('')
  const [result, setResult] = useState('')

  const format = () => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX']
    let formatted = sql
    keywords.forEach((kw) => {
      formatted = formatted.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `\n${kw}`)
    })
    formatted = formatted.replace(/,/g, ',\n  ').replace(/\n\s*\n/g, '\n').trim()
    setResult(formatted)
  }

  const minify = () => {
    setResult(sql.replace(/\s+/g, ' ').trim())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('sqlformat.title')}</h2>
      <p className="text-[#909399] mb-6">{t('sqlformat.desc')}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('input')}</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y" value={sql} onChange={(e) => setSql(e.target.value)} placeholder={t('sqlformat.placeholder')} />
          <div className="flex gap-2 mt-3">
            <button onClick={format} className="btn-primary">{t('sqlformat.format')}</button>
            <button onClick={minify} className="btn-secondary">{t('sqlformat.minify')}</button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('output')}</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y bg-[#f5f7fa]" value={result} readOnly />
          {result && <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary mt-3">{t('copy')}</button>}
        </div>
      </div>
    </div>
  )
}
