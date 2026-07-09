import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Atbash() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const convert = () => {
    setResult(text.split('').map((c) => {
      if (c.match(/[a-z]/)) return String.fromCharCode(219 - c.charCodeAt(0))
      if (c.match(/[A-Z]/)) return String.fromCharCode(155 - c.charCodeAt(0))
      return c
    }).join(''))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('atbash.title')}</h2>
      <p className="text-[#909399] mb-6">{t('atbash.desc')}</p>
      <textarea className="input-field h-32 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('atbash.placeholder')} />
      <button onClick={convert} className="btn-primary mb-4">{t('convert')}</button>
      {result && <textarea className="input-field h-32 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
