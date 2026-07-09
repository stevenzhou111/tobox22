import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HtmlEncoder() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [result, setResult] = useState('')

  const encode = (str: string) => str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c] || c))

  const decode = (str: string) => str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (c) => ({
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'"
  }[c] || c))

  const convert = () => {
    setResult(mode === 'encode' ? encode(text) : decode(text))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('htmlencode.title')}</h2>
      <p className="text-[#909399] mb-6">{t('htmlencode.desc')}</p>

      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('encode')} className={`tab-btn ${mode === 'encode' ? 'active' : ''}`}>{t('htmlencode.encode')}</button>
        <button onClick={() => setMode('decode')} className={`tab-btn ${mode === 'decode' ? 'active' : ''}`}>{t('htmlencode.decode')}</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('input')}</label>
          <textarea className="input-field h-40 font-mono text-sm resize-y" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('htmlencode.placeholder')} />
          <button onClick={convert} className="btn-primary mt-3">{t('convert')}</button>
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('output')}</label>
          <textarea className="input-field h-40 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />
          {result && <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary mt-3">{t('copy')}</button>}
        </div>
      </div>
    </div>
  )
}
