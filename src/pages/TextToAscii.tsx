import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextToAscii() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [ascii, setAscii] = useState('')
  const [mode, setMode] = useState<'textToAscii' | 'asciiToText'>('textToAscii')

  const textToAscii = () => {
    const result = Array.from(text)
      .map((c) => c.charCodeAt(0))
      .join(' ')
    setAscii(result)
  }

  const asciiToText = () => {
    try {
      const result = ascii
        .split(' ')
        .filter((a) => a.length > 0)
        .map((a) => String.fromCharCode(parseInt(a)))
        .join('')
      setText(result)
    } catch {
      console.error('Invalid ASCII')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textascii.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textascii.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setMode('textToAscii')} className={`tab-btn ${mode === 'textToAscii' ? 'active' : ''}`}>
          {t('textascii.textToAscii')}
        </button>
        <button onClick={() => setMode('asciiToText')} className={`tab-btn ${mode === 'asciiToText' ? 'active' : ''}`}>
          {t('textascii.asciiToText')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textascii.text')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textascii.textPlaceholder')}
          />
          {mode === 'textToAscii' && (
            <button onClick={textToAscii} className="btn-primary mt-3">{t('textascii.convert')}</button>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textascii.ascii')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={ascii}
            onChange={(e) => setAscii(e.target.value)}
            placeholder={t('textascii.asciiPlaceholder')}
          />
          {mode === 'asciiToText' && (
            <button onClick={asciiToText} className="btn-primary mt-3">{t('textascii.convert')}</button>
          )}
        </div>
      </div>
    </div>
  )
}
