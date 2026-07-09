import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextToBinary() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [binary, setBinary] = useState('')
  const [mode, setMode] = useState<'textToBin' | 'binToText'>('textToBin')

  const textToBinary = () => {
    const result = Array.from(text)
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ')
    setBinary(result)
  }

  const binaryToText = () => {
    try {
      const result = binary
        .split(' ')
        .filter((b) => b.length === 8)
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join('')
      setText(result)
    } catch {
      console.error('Invalid binary')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textbinary.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textbinary.desc')}</p>

      <div className="flex gap-3 mb-6">
        <button onClick={() => setMode('textToBin')} className={`tab-btn ${mode === 'textToBin' ? 'active' : ''}`}>
          {t('textbinary.textToBin')}
        </button>
        <button onClick={() => setMode('binToText')} className={`tab-btn ${mode === 'binToText' ? 'active' : ''}`}>
          {t('textbinary.binToText')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textbinary.text')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textbinary.textPlaceholder')}
          />
          {mode === 'textToBin' && (
            <button onClick={textToBinary} className="btn-primary mt-3">{t('textbinary.convert')}</button>
          )}
        </div>
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('textbinary.binary')}</label>
          <textarea
            className="input-field h-40 font-mono text-sm resize-y"
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
            placeholder={t('textbinary.binaryPlaceholder')}
          />
          {mode === 'binToText' && (
            <button onClick={binaryToText} className="btn-primary mt-3">{t('textbinary.convert')}</button>
          )}
        </div>
      </div>
    </div>
  )
}
