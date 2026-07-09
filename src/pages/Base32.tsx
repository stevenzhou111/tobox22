import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Base32() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

  const encode = (str: string) => {
    const bytes = new TextEncoder().encode(str)
    let bits = ''
    bytes.forEach((b) => { bits += b.toString(2).padStart(8, '0') })
    while (bits.length % 5 !== 0) bits += '0'
    let encoded = ''
    for (let i = 0; i < bits.length; i += 5) {
      encoded += chars[parseInt(bits.slice(i, i + 5), 2)]
    }
    return encoded
  }

  const decode = (str: string) => {
    let bits = ''
    str.toUpperCase().split('').forEach((c) => {
      const val = chars.indexOf(c)
      if (val !== -1) bits += val.toString(2).padStart(5, '0')
    })
    const bytes = new Uint8Array(Math.floor(bits.length / 8))
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2)
    }
    return new TextDecoder().decode(bytes)
  }

  const convert = () => {
    try {
      setResult(mode === 'encode' ? encode(text) : decode(text))
    } catch { setResult('Error') }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('base32.title')}</h2>
      <p className="text-[#909399] mb-6">{t('base32.desc')}</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('encode')} className={`tab-btn ${mode === 'encode' ? 'active' : ''}`}>{t('encode')}</button>
        <button onClick={() => setMode('decode')} className={`tab-btn ${mode === 'decode' ? 'active' : ''}`}>{t('decode')}</button>
      </div>
      <textarea className="input-field h-32 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('base32.placeholder')} />
      <button onClick={convert} className="btn-primary mb-4">{t('convert')}</button>
      {result && <textarea className="input-field h-32 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
