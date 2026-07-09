import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Rot13() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const convert = () => {
    setResult(text.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
    }))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('rot13.title')}</h2>
      <p className="text-[#909399] mb-6">{t('rot13.desc')}</p>
      <textarea className="input-field h-32 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('rot13.placeholder')} />
      <button onClick={convert} className="btn-primary mb-4">{t('convert')}</button>
      {result && <textarea className="input-field h-32 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
