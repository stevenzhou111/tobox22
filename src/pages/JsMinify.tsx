import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function JsMinify() {
  const { t } = useTranslation()
  const [js, setJs] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')

  const minify = () => {
    setResult(js.replace(/\s+/g, ' ').replace(/\s*([{};,.()\[\]])\s*/g, '$1').replace(/;\s*}/g, '}').trim())
  }

  const beautify = () => {
    let formatted = js.replace(/;/g, ';\n').replace(/{/g, ' {\n  ').replace(/}/g, '\n}\n').replace(/,/g, ',\n  ')
    setResult(formatted.replace(/\n\s*\n/g, '\n').trim())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('jsminify.title')}</h2>
      <p className="text-[#909399] mb-6">{t('jsminify.desc')}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('minify')} className={`tab-btn ${mode === 'minify' ? 'active' : ''}`}>{t('jsminify.minify')}</button>
        <button onClick={() => setMode('beautify')} className={`tab-btn ${mode === 'beautify' ? 'active' : ''}`}>{t('jsminify.beautify')}</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">JavaScript</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y" value={js} onChange={(e) => setJs(e.target.value)} placeholder={t('jsminify.placeholder')} />
          <button onClick={mode === 'minify' ? minify : beautify} className="btn-primary mt-3">{mode === 'minify' ? t('jsminify.minify') : t('jsminify.beautify')}</button>
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
