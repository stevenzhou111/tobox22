import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextSplit() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [delimiter, setDelimiter] = useState('\n')
  const [result, setResult] = useState('')

  const split = () => {
    const parts = text.split(delimiter === '\\n' ? '\n' : delimiter === '\\t' ? '\t' : delimiter)
    setResult(parts.join('\n'))
  }

  const joinWith = (sep: string) => {
    const parts = text.split(delimiter === '\\n' ? '\n' : delimiter === '\\t' ? '\t' : delimiter)
    setResult(parts.join(sep))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{t('textsplit.title')}</h2>
      <p className="text-[var(--text-secondary)] mb-6">{t('textsplit.desc')}</p>

      <textarea
        className="input-field h-40 font-mono text-sm resize-y"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textsplit.placeholder')}
      />

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--text-secondary)]">{t('textsplit.delimiter')}:</label>
          <select className="input-field w-32" value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value="\n">{t('textsplit.newline')}</option>
            <option value=",">{t('textsplit.comma')}</option>
            <option value=" ">{t('textsplit.space')}</option>
            <option value="\t">{t('textsplit.tab')}</option>
            <option value="|">{t('textsplit.pipe')}</option>
            <option value=";">{t('textsplit.semicolon')}</option>
          </select>
        </div>
        <button onClick={split} className="btn-primary">{t('textsplit.split')}</button>
        <div className="flex gap-2">
          <button onClick={() => joinWith(', ')} className="btn-secondary text-sm">{t('textsplit.joinComma')}</button>
          <button onClick={() => joinWith('\n')} className="btn-secondary text-sm">{t('textsplit.joinNewline')}</button>
          <button onClick={() => joinWith(' ')} className="btn-secondary text-sm">{t('textsplit.joinSpace')}</button>
        </div>
      </div>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[var(--text-secondary)]">{t('output')}</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-sm text-blue-500 hover:text-blue-600">{t('copy')}</button>
          </div>
          <pre className="result-box h-40 overflow-auto">{result}</pre>
        </div>
      )}
    </div>
  )
}
