import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextEncrypt() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [method, setMethod] = useState('caesar')
  const [key, setKey] = useState('3')

  const encrypt = () => {
    switch (method) {
      case 'caesar': {
        const shift = parseInt(key) || 3
        const encrypted = text.split('').map((c) => {
          if (c.match(/[a-z]/)) return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97)
          if (c.match(/[A-Z]/)) return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65)
          return c
        }).join('')
        setResult(encrypted)
        break
      }
      case 'reverse':
        setResult(text.split('').reverse().join(''))
        break
      case 'atbash':
        setResult(text.split('').map((c) => {
          if (c.match(/[a-z]/)) return String.fromCharCode(219 - c.charCodeAt(0))
          if (c.match(/[A-Z]/)) return String.fromCharCode(155 - c.charCodeAt(0))
          return c
        }).join(''))
        break
      case 'rot13':
        setResult(text.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97
          return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
        }))
        break
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textencrypt.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textencrypt.desc')}</p>

      <div className="mb-4">
        <label className="block text-sm text-[#909399] mb-1">{t('textencrypt.input')}</label>
        <textarea
          className="input-field h-32 font-mono text-sm resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('textencrypt.placeholder')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textencrypt.method')}</label>
          <select className="input-field w-40" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="caesar">{t('textencrypt.caesar')}</option>
            <option value="reverse">{t('textencrypt.reverse')}</option>
            <option value="atbash">{t('textencrypt.atbash')}</option>
            <option value="rot13">ROT13</option>
          </select>
        </div>
        {method === 'caesar' && (
          <div>
            <label className="block text-sm text-[#909399] mb-1">{t('textencrypt.shift')}</label>
            <input type="number" className="input-field w-24" value={key} onChange={(e) => setKey(e.target.value)} />
          </div>
        )}
        <button onClick={encrypt} className="btn-primary mt-5">{t('textencrypt.encrypt')}</button>
      </div>

      {result && (
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textencrypt.output')}</label>
          <textarea className="input-field h-32 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />
        </div>
      )}
    </div>
  )
}
