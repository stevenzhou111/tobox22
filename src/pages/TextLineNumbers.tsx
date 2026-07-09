import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextLineNumbers() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [start, setStart] = useState(1)
  const [result, setResult] = useState('')

  const addNumbers = () => {
    const lines = text.split('\n')
    setResult(lines.map((line, i) => `${start + i}\t${line}`).join('\n'))
  }

  const removeNumbers = () => {
    setResult(text.replace(/^\d+\t?/gm, ''))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('linenumbers.title')}</h2>
      <p className="text-[#909399] mb-6">{t('linenumbers.desc')}</p>
      <textarea className="input-field h-40 font-mono text-sm resize-y mb-4" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('linenumbers.placeholder')} />
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#909399]">{t('linenumbers.start')}:</label>
          <input type="number" className="input-field w-20" value={start} onChange={(e) => setStart(Number(e.target.value))} />
        </div>
        <button onClick={addNumbers} className="btn-primary">{t('linenumbers.add')}</button>
        <button onClick={removeNumbers} className="btn-secondary">{t('linenumbers.remove')}</button>
      </div>
      {result && <textarea className="input-field h-40 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />}
    </div>
  )
}
