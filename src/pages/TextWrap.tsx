import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextWrap() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [width, setWidth] = useState(80)
  const [result, setResult] = useState('')

  const wrap = () => {
    const words = text.split(' ')
    let line = ''
    const lines: string[] = []
    words.forEach((word) => {
      if ((line + ' ' + word).trim().length > width && line) { lines.push(line.trim()); line = '' }
      line += ' ' + word
    })
    if (line.trim()) lines.push(line.trim())
    setResult(lines.join('\n'))
  }

  const unwrap = () => {
    setResult(text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textwrap.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textwrap.desc')}</p>
      <textarea className="input-field h-40 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('textwrap.placeholder')} />
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#909399]">{t('textwrap.width')}:</label>
          <input type="number" className="input-field w-20" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>
        <button onClick={wrap} className="btn-primary">{t('textwrap.wrap')}</button>
        <button onClick={unwrap} className="btn-secondary">{t('textwrap.unwrap')}</button>
        {result && <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary">{t('copy')}</button>}
      </div>
      {result && <textarea className="input-field h-40 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
