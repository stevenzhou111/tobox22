import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CssMinify() {
  const { t } = useTranslation()
  const [css, setCss] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')

  const minify = () => {
    setResult(css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .trim()
    )
  }

  const beautify = () => {
    let formatted = css
      .replace(/\{/g, ' {\n  ')
      .replace(/\}/g, '\n}\n')
      .replace(/;/g, ';\n  ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
    setResult(formatted)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('cssminify.title')}</h2>
      <p className="text-[#909399] mb-6">{t('cssminify.desc')}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('minify')} className={`tab-btn ${mode === 'minify' ? 'active' : ''}`}>{t('cssminify.minify')}</button>
        <button onClick={() => setMode('beautify')} className={`tab-btn ${mode === 'beautify' ? 'active' : ''}`}>{t('cssminify.beautify')}</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">CSS</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y" value={css} onChange={(e) => setCss(e.target.value)} placeholder={t('cssminify.placeholder')} />
          <button onClick={mode === 'minify' ? minify : beautify} className="btn-primary mt-3">{mode === 'minify' ? t('cssminify.minify') : t('cssminify.beautify')}</button>
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
