import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HtmlMinify() {
  const { t } = useTranslation()
  const [html, setHtml] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify')

  const minify = () => {
    setResult(html.replace(/\n\s*/g, '').replace(/>\s+</g, '><').trim())
  }

  const beautify = () => {
    let formatted = ''
    let indent = 0
    html.replace(/(>)(<)(\/*)/g, '$1\n$2$3').split('\n').forEach((line) => {
      if (line.match(/^<\/\w/)) indent--
      formatted += '  '.repeat(Math.max(0, indent)) + line.trim() + '\n'
      if (line.match(/^<\w[^>]*[^\/]>.*$/) && !line.match(/^<(br|hr|img|input|meta|link)/i)) indent++
    })
    setResult(formatted.trim())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('htmlminify.title')}</h2>
      <p className="text-[#909399] mb-6">{t('htmlminify.desc')}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('minify')} className={`tab-btn ${mode === 'minify' ? 'active' : ''}`}>{t('htmlminify.minify')}</button>
        <button onClick={() => setMode('beautify')} className={`tab-btn ${mode === 'beautify' ? 'active' : ''}`}>{t('htmlminify.beautify')}</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">HTML</label>
          <textarea className="input-field h-64 font-mono text-xs resize-y" value={html} onChange={(e) => setHtml(e.target.value)} placeholder={t('htmlminify.placeholder')} />
          <button onClick={mode === 'minify' ? minify : beautify} className="btn-primary mt-3">{mode === 'minify' ? t('htmlminify.minify') : t('htmlminify.beautify')}</button>
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
