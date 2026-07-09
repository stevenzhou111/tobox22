import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TextSort() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [type, setType] = useState<'alpha' | 'length' | 'numeric'>('alpha')

  const sort = () => {
    const lines = text.split('\n')
    const sorted = [...lines].sort((a, b) => {
      if (type === 'numeric') return order === 'asc' ? parseFloat(a) - parseFloat(b) : parseFloat(b) - parseFloat(a)
      if (type === 'length') return order === 'asc' ? a.length - b.length : b.length - a.length
      return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    })
    setResult(sorted.join('\n'))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#303133] mb-2">{t('textsort.title')}</h2>
      <p className="text-[#909399] mb-6">{t('textsort.desc')}</p>

      <div className="mb-4">
        <textarea className="input-field h-40 font-mono text-sm resize-y" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('textsort.placeholder')} />
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select className="input-field w-32" value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="alpha">{t('textsort.alpha')}</option>
          <option value="length">{t('textsort.length')}</option>
          <option value="numeric">{t('textsort.numeric')}</option>
        </select>
        <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} className="btn-secondary">{order === 'asc' ? '↑ A-Z' : '↓ Z-A'}</button>
        <button onClick={sort} className="btn-primary">{t('textsort.sort')}</button>
      </div>

      {result && (
        <div>
          <label className="block text-sm text-[#909399] mb-1">{t('output')}</label>
          <textarea className="input-field h-40 font-mono text-sm resize-y bg-[#f5f7fa]" value={result} readOnly />
        </div>
      )}
    </div>
  )
}
