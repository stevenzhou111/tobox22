import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextToHex() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [hex, setHex] = useState('')
  const [mode, setMode] = useState<'textToHex' | 'hexToText'>('textToHex')

  const textToHex = () => {
    const result = Array.from(text)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ')
    setHex(result)
  }

  const hexToText = () => {
    try {
      const result = hex
        .split(' ')
        .filter((h) => h.length === 2)
        .map((h) => String.fromCharCode(parseInt(h, 16)))
        .join('')
      setText(result)
    } catch {
      console.error('Invalid hex')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('texthex.title')}</h2>
      <p className="text-[#909399] mb-6">{t('texthex.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setMode('textToHex')} className={`tab-btn ${mode === 'textToHex' ? 'active' : ''}`}>
          {t('texthex.textToHex')}
        </button>
        <button onClick={() => setMode('hexToText')} className={`tab-btn ${mode === 'hexToText' ? 'active' : ''}`}>
          {t('texthex.hexToText')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('texthex.text')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('texthex.textPlaceholder')}
          />
          {mode === 'textToHex' && (
            <button onClick={textToHex} className="btn-primary mt-3">{t('texthex.convert')}</button>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('texthex.hex')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder={t('texthex.hexPlaceholder')}
          />
          {mode === 'hexToText' && (
            <button onClick={hexToText} className="btn-primary mt-3">{t('texthex.convert')}</button>
          )}
        </div>
      </div>
    </div>
  )
}
